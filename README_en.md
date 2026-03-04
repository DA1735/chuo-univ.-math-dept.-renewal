# Central University Department of Mathematics Website (Renewal)

This project is a React-based single page application (SPA) for the renewal of the Department of Mathematics website at Chuo University.

## Tech Stack

- **Framework**: React 19
- **Router**: React Router DOM 7 (HashRouter)
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Icons**: Lucide React

## Project Structure

| Directory / File | Description |
|------------------|-------------|
| `index.html` | Entry point |
| `index.tsx` | React root mount |
| `App.tsx` | Main application component and **Routing Configuration** |
| `components/` | Reusable UI components (Layout, Breadcrumbs, etc.) |
| `pages/` | Page components |
| `data/` | Data files (acting as a mock database) |
| `types.ts` | TypeScript interface definitions |
| `constants.ts` | Global constants |

## How to Add a New Page

To add a new page to the website, follow these steps:

### 1. Create a Page Component

Create a new `.tsx` file in the `pages/` directory (or a subdirectory).

**Example:** `pages/NewPage.tsx`

```tsx
import React from 'react';
import { motion } from 'framer-motion';
import Breadcrumbs from '../components/Breadcrumbs';

const NewPage: React.FC = () => {
  return (
    <div className="bg-[#FAFBFC] min-h-screen pb-24">
      {/* Header Section */}
      <section className="bg-chuo-blue text-white pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-5xl">
          <Breadcrumbs dark /> {/* Add Breadcrumbs if needed */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl md:text-5xl font-bold mb-6 font-serif">
              New Page Title
            </h1>
            <p className="text-gray-300 text-lg">
              Description of the new page.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <div className="container mx-auto px-6 py-16 max-w-5xl">
        <div className="bg-white p-8 rounded-sm shadow-sm">
          <p>Content goes here.</p>
        </div>
      </div>
    </div>
  );
};

export default NewPage;
```

### 2. Add Routing

Import the new component in `App.tsx` and add a `<Route>` definition inside `<Routes>`.

```tsx
// App.tsx
import NewPage from './pages/NewPage';

// ...

<Routes>
  {/* ... existing routes ... */}
  <Route path="/new-page" element={<NewPage />} />
</Routes>
```

### 3. Update Breadcrumbs (Optional)

If you want the page to appear nicely in the breadcrumb navigation, add a mapping in `components/Breadcrumbs.tsx`.

```tsx
// components/Breadcrumbs.tsx
const routeNameMap: Record<string, string> = {
  // ... existing mappings ...
  'new-page': '新しいページ', // Map URL segment to Display Name
};
```

### 4. Add Links

Add links to the new page from other parts of the site (e.g., `pages/Home.tsx`, `components/Layout.tsx` footer, etc.) using `<Link>`.

```tsx
import { Link } from 'react-router-dom';

<Link to="/new-page">Go to New Page</Link>
```

## Data Management

This project uses local TypeScript files in `data/` as a data source.

**To add new content (News, Seminar events, Staff, etc.):**

1. Open the relevant file in `data/` (e.g., `data/news.ts`).
2. Add a new object to the exported array following the defined Type interface.
3. The changes will be reflected automatically on the website.

## Deployment

This project is designed to be deployed as a static site (e.g., Vercel, GitHub Pages).

Ensure that the build command corresponds to your hosting environment's requirements for React apps.

## Using Templates

To facilitate the creation of new pages, template files are available in the `templates/` directory.
By copying these files to the `pages/` directory and modifying their content, you can easily create pages that adhere to the site's design rules (layout, color scheme, animations, etc.).

### 1. `BasicPageTemplate.tsx`
**Usage:** General content pages (e.g., Announcements, Terms of Service, Introductions)
- A simple structure with a standard header and a white content area.
- Includes examples of styling for headings, body text, and lists.

### 2. `ListPageTemplate.tsx`
**Usage:** List view pages (e.g., News list, Member list)
- Configured to loop through an array of data and display items as cards.
- Incorporates `Stagger Animation` (elements appearing sequentially) for a polished look.

### 3. `DetailPageTemplate.tsx`
**Usage:** Detail pages (e.g., Article details, Event details)
- Includes logic to retrieve URL parameters (such as IDs) and display data dynamically.
- Uses a 2-column layout with main content on the left and a sidebar on the right.

### How to Use

1. Choose a suitable file from `templates/` and copy it to the `pages/` directory (e.g., as `pages/NewPage.tsx`).
2. Modify the component name and display content.
3. Import data sources from the `data/` directory as needed.
4. Add the route to `App.tsx`.