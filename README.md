# StudioSpace - Peer-to-Peer Creative Workspace

StudioSpace is a high-performance peer-to-peer marketplace designed for creators, filmmakers, photographers, podcasters, and musicians. Studio owners can list their creative spaces, and fellow creators can discover, filter, and reserve studio slots with transparent pricing and real-time booking management.

## Live Site URL
**[https://studios-client.vercel.app](https://studios-client.vercel.app)**

##  Technologies Used
- **Frontend:** Next.js (App Router), TypeScript, Tailwind CSS, Swiper.js, Lucide Icons
- **Backend:** Node.js, Express.js, MongoDB
- **Authentication:** BetterAuth (Google OAuth & Email/Password)
- **Image Hosting:** ImgBB API
- **Deployment:** Vercel (Client) & Render (Server)

##  Key Features
1. **Dynamic Studio Discovery:** Interactive Swiper hero slider, category filtering, and a fully responsive grid layout for browsing studios.
2. **Studio Hosting & CRUD:** Authenticated users can add, update, and delete their studio listings using a rich form with ImgBB image uploads.
3. **Secure Booking System:** Real-time booking modal with date and time selection, and a **Double-Booking Prevention** system (Challenge 2) that blocks overlapping reservations.
4. **User Dashboard:** A dedicated space for users to view their owned listings ("My Listings") and track or cancel their reservations ("My Bookings").
5. **Premium UI/UX:** A cinematic dark/light theme toggle (Challenge 3), custom toast notifications via Sonner, skeleton loaders, and a custom 404 page.

