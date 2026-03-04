import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import { cors } from 'hono/cors'
import { pool } from './db'

const app = new Hono()

app.use('/api/*', cors())

app.get('/', (c) => {
    return c.html(
        <html>
            <head>
                <title>Chuo Math Backend API</title>
                <meta charset="utf-8" />
                <style>
                    {`
            body { font-family: sans-serif; padding: 2rem; }
            h1 { color: #333; }
          `}
                </style>
            </head>
            <body>
                <h1>Chuo Math Backend API is running!</h1>
                <p>This is a Hono JSX backend server.</p>
            </body>
        </html>
    )
})

app.get('/api/health', (c) => {
    return c.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.get('/api/news', async (c) => {
    try {
        const [rows] = await pool.query('SELECT * FROM news ORDER BY date DESC');
        return c.json(rows);
    } catch (err) {
        return c.json({ error: 'Failed to fetch news' }, 500);
    }
})

app.get('/api/encounters', async (c) => {
    try {
        const [rows] = await pool.query('SELECT * FROM encounters ORDER BY number ASC');
        return c.json(rows);
    } catch (err) {
        return c.json({ error: 'Failed to fetch encounters' }, 500);
    }
})

app.get('/api/encounters/:id', async (c) => {
    const id = c.req.param('id');
    try {
        const [rows]: any = await pool.query('SELECT * FROM encounters WHERE number = ?', [id]);
        if (rows.length === 0) return c.json({ error: 'Not found' }, 404);
        return c.json(rows[0]);
    } catch (err) {
        return c.json({ error: 'Failed to fetch encounter' }, 500);
    }
})

app.get('/api/ewm-sub', async (c) => {
    try {
        const [rows] = await pool.query('SELECT * FROM ewm WHERE is_extra = FALSE ORDER BY number DESC');
        return c.json(rows);
    } catch (err) {
        return c.json({ error: 'Failed to fetch ewm' }, 500);
    }
})

app.get('/api/ewm-sub-extra', async (c) => {
    try {
        const [rows] = await pool.query('SELECT * FROM ewm WHERE is_extra = TRUE ORDER BY number DESC');
        return c.json(rows);
    } catch (err) {
        return c.json({ error: 'Failed to fetch ewm_extra' }, 500);
    }
})

app.get('/api/staff', async (c) => {
    try {
        const [rows] = await pool.query('SELECT * FROM staff ORDER BY id ASC');
        return c.json(rows);
    } catch (err) {
        return c.json({ error: 'Failed to fetch staff' }, 500);
    }
})

app.get('/api/seminars/:category', async (c) => {
    const category = c.req.param('category');
    try {
        const [rows] = await pool.query('SELECT * FROM seminars WHERE category = ? ORDER BY number ASC', [category]);
        return c.json(rows);
    } catch (err) {
        return c.json({ error: 'Failed to fetch seminars' }, 500);
    }
})

const port = 3001
console.log(`Server is running on port ${port}`)

serve({
    fetch: app.fetch,
    port
})
