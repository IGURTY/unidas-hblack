# AI_RULES.md

## Tech Stack Overview

- **React** (with TypeScript) for all frontend UI development.
- **Vite** as the build tool and development server.
- **shadcn/ui** for all UI components (buttons, cards, tables, etc.).
- **Tailwind CSS** for utility-first styling and responsive design.
- **React Router** for client-side routing (keep all routes in `src/App.tsx`).
- **Supabase** for backend/database and authentication (access via `@/integrations/supabase/client`).
- **@tanstack/react-query** for data fetching, caching, and server state management.
- **lucide-react** for icons.
- **sonner** and shadcn/ui's own toast for notifications.
- **recharts** for data visualization and charts.
- **date-fns** for date manipulation.

## Library Usage Rules

- **UI Components:**  
  Always use shadcn/ui components for all UI elements (buttons, cards, tables, tabs, etc.).  
  Do NOT use Material UI, Ant Design, Chakra UI, or any other UI library.

- **Styling:**  
  Use Tailwind CSS utility classes for all custom styling.  
  Do NOT use CSS-in-JS, styled-components, or SCSS.

- **Icons:**  
  Use only `lucide-react` for all icons.

- **Routing:**  
  Use React Router (`react-router-dom`).  
  Define all routes in `src/App.tsx`.  
  Do NOT use Next.js routing or any other router.

- **Data Fetching:**  
  Use `@tanstack/react-query` for all asynchronous data fetching and caching.  
  Do NOT use SWR, Redux, or direct fetch calls in components.

- **Backend/Database:**  
  Use Supabase for all backend/database operations.  
  Access the Supabase client via `@/integrations/supabase/client`.

- **Notifications:**  
  Use `sonner` or shadcn/ui's toast for all user notifications and toasts.  
  Do NOT use notistack, react-toastify, or other notification libraries.

- **Charts & Data Visualization:**  
  Use `recharts` for all charting needs.

- **Date Handling:**  
  Use `date-fns` for all date manipulation and formatting.

- **Component Organization:**  
  Place all components in `src/components/`.  
  Place all pages in `src/pages/`.  
  Main page is `src/pages/Index.tsx`.

- **Responsiveness:**  
  All components and pages must be responsive using Tailwind CSS.

- **No Overengineering:**  
  Keep code simple and maintainable.  
  Do NOT introduce unnecessary abstractions or libraries.