import { testConnection, pool } from '../server/db';
import { NEWS } from '../data/news';
import { EWM_DATA } from '../data/ewm';
import { STAFF } from '../data/staff';
import { TOPOLOGY_DATA } from '../data/topologySeminars';
import { COLLOQUIUM_DATA } from '../data/colloquium';
import { SPECIAL_LECTURES } from '../data/specialLectures';
import { WORKSHOPS } from '../data/workshops';
import { EWM_EXTRA_DATA } from '../data/ewmExtra';

const insertNews = async () => {
    for (const item of NEWS) {
        await pool.query(
            `INSERT INTO news (id, date, category, title, link) VALUES (?, ?, ?, ?, ?)`,
            [item.id, item.date, item.category, item.title, item.link]
        );
    }
    console.log(`Inserted ${NEWS.length} news items.`);
};


const insertEwmSub = async () => {
    for (const item of EWM_DATA) {
        await pool.query(
            `INSERT INTO ewm (is_extra, number, date, title, speaker, affiliation, time, place, abstract, note, poster, documents)
             VALUES (FALSE, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                item.number, item.date, item.title, item.speaker, item.affiliation || null,
                item.time || null, item.place || null, item.abstract || null, item.note || null,
                item.poster || null, item.documents ? JSON.stringify(item.documents) : null
            ]
        );
    }
    console.log(`Inserted ${EWM_DATA.length} ewm items.`);

    for (const item of EWM_EXTRA_DATA) {
        await pool.query(
            `INSERT INTO ewm (is_extra, number, date, title, speaker, affiliation, time, place, abstract, note, poster, documents)
             VALUES (TRUE, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                item.number, item.date, item.title, item.speaker || null, item.affiliation || null,
                item.time || null, item.place || null, item.abstract || null, item.note || null,
                item.poster || null, item.documents ? JSON.stringify(item.documents) : null
            ]
        );
    }
    console.log(`Inserted ${EWM_EXTRA_DATA.length} ewm extra items.`);
};

const insertStaff = async () => {
    for (const item of STAFF) {
        await pool.query(
            `INSERT INTO staff (id, role, name_ja, name_en, position, fields, email, photo, personal_page, lab_page, notes)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                item.id, item.role, item.name_ja, item.name_en || null, item.position,
                JSON.stringify(item.fields), item.email || null, item.photo || null,
                item.personal_page || null, item.lab_page || null, item.notes || null
            ]
        );
    }
    console.log(`Inserted ${STAFF.length} staff items.`);
};

const insertSeminars = async () => {
    const seminarSources: { cat: string, data: any[] }[] = [
        { cat: 'topology', data: TOPOLOGY_DATA },
        { cat: 'colloquium', data: COLLOQUIUM_DATA },
        { cat: 'specialLectures', data: SPECIAL_LECTURES },
        { cat: 'workshops', data: WORKSHOPS }
    ];

    let total = 0;
    for (const source of seminarSources) {
        for (const item of source.data) {
            await pool.query(
                `INSERT INTO seminars (category, badge, number, date, title, speaker, affiliation, time, place, abstract, note, poster, documents, link)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    source.cat, item.badge || null, item.number || null, item.date || null, item.title || null,
                    item.speaker || null, item.affiliation || null, item.time || null, item.place || null,
                    item.abstract || null, item.note || null, item.poster || null,
                    item.documents ? JSON.stringify(item.documents) : null, item.link || null
                ]
            );
            total++;
        }
    }
    console.log(`Inserted ${total} seminar items across all categories.`);
};


async function seed() {
    const isConnected = await testConnection();
    if (!isConnected) {
        console.error("DB connection failed.");
        process.exit(1);
    }

    try {
        console.log("Seeding database tables...");

        await insertNews();
        await insertEwmSub();
        await insertStaff();
        await insertSeminars();

        console.log("Database seeded successfully.");
    } catch (err) {
        console.error("Error seeding tables:", err);
    } finally {
        pool.end();
    }
}

seed();
