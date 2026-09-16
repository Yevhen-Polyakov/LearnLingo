# School of the Future

## 📚 About the Project

**School of the Future** is a responsive web application that helps users find foreign language teachers and book individual lessons.

Users can browse available teachers, use filters to find a suitable teacher, view detailed information and reviews, add teachers to favorites, and book lessons.

The project was developed as a **team project** using React, TypeScript, Firebase, Zustand, and TanStack Query.

---

## 🌐 Live Demo

**Live Demo:** [Add deployed project link]

**GitHub:** [Add repository link]

**Figma:** [https://www.figma.com/design/9hj4L1JBtVnl7DZduI7UPb/Learn-Lingo--Copy-?node-id=0-1&p=f&t=ES8cRTQdGBKBJMmH-0]


---

## ✨ Main Features

### 👨‍🏫 Teachers

* Browse a list of available teachers
* View teacher information
* View teacher experience
* View teaching conditions
* View languages and levels
* View hourly price
* View rating
* View number of completed lessons
* View student reviews
* Expand and collapse additional teacher information

### 🔎 Filtering

Users can filter teachers by:

* Language
* Learning level
* Hourly price

Filters are stored in a global Zustand store and can be applied to the loaded teachers.

### 📄 Pagination

Teachers are loaded in batches instead of loading the entire list at once.

The project uses **TanStack Query `useInfiniteQuery`** to implement pagination.

Users can load additional teachers using the **Load More** button.

### ❤️ Favorites

Authenticated users can add teachers to their favorites.

Each user has their own independent list of favorite teachers.

For example:

```text
favoritesByUser
│
├── user_1 → [teacher_1, teacher_3]
├── user_2 → [teacher_2, teacher_5]
└── user_3 → [teacher_4]
```

Users can:

* Add a teacher to favorites
* Remove a teacher from favorites
* View their favorite teachers
* Keep their favorites after page reload
* Keep their favorites when logging out and logging in again

Favorites are managed with **Zustand** and persisted using **Zustand Persist**.

### 🔐 Authentication

Authentication is implemented using **Firebase Authentication**.

Users can:

* Create an account
* Log in
* Log out
* Access protected pages after authentication

Email and password authentication is used.

Each authenticated user has a unique Firebase `uid`, which is used to associate favorites with the correct user.

### 🛡 Protected Routes

The Favorites page is available only to authenticated users.

Unauthenticated users who try to access the protected page are redirected to the Home page.

The application uses a custom `PrivateRouter` component together with React Router.

### 📅 Booking

Users can open the booking flow from a teacher card.

The selected teacher is passed to the booking modal, where the user can proceed with booking a lesson.

### 🔔 Notifications

The application uses **React Hot Toast** to display notifications for user actions and errors.

Examples:

* Successful actions
* Authentication errors
* Unauthorized access
* Other application errors

---

# 🛠 Technologies

## Frontend

* **React**
* **TypeScript**
* **Vite**
* **React Router**
* **Zustand**
* **TanStack Query**
* **Formik**
* **Yup**
* **CSS Modules**
* **React Icons**
* **React Hot Toast**

## Firebase

* **Firebase Authentication**
* **Firebase Realtime Database**

## Development Tools

* Git
* GitHub
* ESLint
* Prettier
* Vite

---

# 🗄 Firebase

The project uses Firebase for authentication and teacher data.

## Firebase Authentication

Firebase Authentication is used for:

* User registration
* User login
* User logout
* Tracking authentication state

The application uses the Email/Password authentication method.

## Firebase Realtime Database

Teacher data is stored in Firebase Realtime Database.

Example structure:

```text
teachers
└── teachers
    ├── teacher_1
    │   ├── name
    │   ├── surname
    │   ├── languages
    │   ├── levels
    │   ├── rating
    │   ├── price_per_hour
    │   ├── lessons_done
    │   ├── avatar_url
    │   ├── lesson_info
    │   ├── conditions
    │   ├── experience
    │   └── reviews
    │
    ├── teacher_2
    └── ...
```

Teacher data is retrieved using the **Firebase Realtime Database REST API**.

Firebase Authentication is used through the Firebase SDK.

---

# 🧠 State Management

The application uses **Zustand** for global client-side state.

There are separate stores for different parts of the application.

## Authentication Store

The authentication store contains information about the current user:

```ts
type AuthStore = {
  isLoggedIn: boolean;
  uid: string | null;
  setAuth: (uid: string | null) => void;
};
```

It stores:

* Authentication status
* Current user's Firebase `uid`

## Favorites Store

The favorites store contains:

```ts
type FavoriteStore = {
  favoriteIds: string[];
  favoritesByUser: Record<string, string[]>;
};
```

`favoriteIds` contains the favorites of the currently authenticated user.

`favoritesByUser` contains favorite lists for all users.

## Filter Store

The filter state contains:

```ts
type FilterStore = {
  language: string;
  level: string;
  price: string;
};
```

It is used to manage the currently selected teacher filters.

---

# 🔄 Server State Management

**TanStack Query** is used for server data management.

The project uses:

* `useQuery`
* `useQueries`
* `useInfiniteQuery`

### `useQuery`

Used for fetching individual teacher data.

For example, the Favorites page uses individual queries to retrieve the teachers saved by the current user.

### `useQueries`

Used when several teacher requests need to be executed dynamically.

For example:

```ts
const favoritesQueries = useQueries({
  queries: favoriteIds.map((id) => ({
    queryKey: ["teacher", id],
    queryFn: () => getTeacherById(id),
  })),
});
```

### `useInfiniteQuery`

Used to load teachers page by page.

This allows the application to load additional teachers without requesting the entire dataset at once.

---

# 🧩 Application Architecture

The application follows a component-based React architecture.

Main structure:

```text
src/
├── components/
│   ├── AuthModal/
│   ├── BurgerMenu/
│   ├── Button/
│   ├── CategorySelect/
│   ├── Experience/
│   ├── FavoriteItem/
│   ├── Filters/
│   ├── Header/
│   ├── Layout/
│   ├── PrivateRouter/
│   ├── TeacherItem/
│   └── ...
│
├── pages/
│   ├── HomePage/
│   ├── TeachersPage/
│   ├── FavoritesPage/
│   └── ...
│
├── lib/
│   ├── api/
│   │   ├── authService.ts
│   │   └── teacherService.ts
│   │
│   ├── store/
│   │   ├── authStore.ts
│   │   ├── favoriteStore.ts
│   │   └── filterStore.ts
│   │
│   └── firebase.ts
│
├── types/
│   └── Type.ts
│
├── App.tsx
└── main.tsx
```

---

# 🧭 Routing

The application uses **React Router**.

Main routes include:

```text
/
├── Home
├── Teachers
└── favorites 🔒
```

The Favorites page is protected by `PrivateRouter`.

Example routing structure:

```text
Layout
│
├── Home
├── Teachers
│
└── PrivateRouter
    └── Favorites
```

The `Layout` component provides shared application functionality such as:

* Header
* Authentication state
* Booking modal
* Toast notifications
* Outlet context

---

# 📱 Responsive Design

The application is fully responsive and adapted for:

* Desktop
* Tablet
* Mobile

The interface follows the provided Figma design and adjusts its layout according to the screen size.

Responsive design was implemented for:

* Header
* Navigation
* Teacher cards
* Filters
* Modals
* Forms
* Favorites
* Buttons
* Page layouts

---

# 🎨 Design

The project was developed according to the provided **Figma design**.

The design was used as a reference for:

* Layout
* Typography
* Colors
* Spacing
* Components
* Buttons
* Forms
* Cards
* Modals
* Responsive behavior

**Figma:** [Add Figma link]

---

# 📋 Technical Specification

The project was developed according to the provided technical specification.

The main requirements included:

* Build a responsive React application
* Use TypeScript
* Implement the provided Figma design
* Create a teachers listing page
* Display teacher information
* Implement teacher filtering
* Implement pagination / Load More functionality
* Create a Favorites page
* Implement user registration
* Implement user authentication
* Implement logout functionality
* Protect the Favorites page
* Store favorites separately for each user
* Use Firebase Authentication
* Use Firebase Realtime Database
* Implement responsive design
* Handle loading and error states
* Implement reusable React components

---

# 🔐 Environment Variables

Create a `.env` file in the root directory.

Example:

```env
VITE_API_URL=your_firebase_database_url

VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

Do not commit the `.env` file to the repository.

---

# 🚀 Installation

Clone the repository:

```bash
git clone <repository-url>
```

Navigate to the project directory:

```bash
cd school-of-the-future
```

Install dependencies:

```bash
npm install
```

Create the `.env` file and add the required Firebase configuration.

Start the development server:

```bash
npm run dev
```

The application will be available at the local development URL provided by Vite.

---

# 📦 Production Build

To create a production build:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

---

# 👥 Team Development

This project was developed as a collaborative team project.

Git and GitHub were used for version control and collaboration.

The development process included:

* Feature branches
* Pull Requests
* Code reviews
* Task distribution
* Component development
* Integration of different features
* Bug fixing

Each team member was responsible for assigned features and tasks.

---

# 👨‍💻 My Contribution

As a frontend developer, my contribution included:

* Developing React components
* Implementing responsive layouts
* Working with TypeScript
* Integrating Firebase Authentication
* Working with Firebase Realtime Database
* Implementing Zustand stores
* Implementing teacher filtering
* Implementing favorites functionality
* Implementing protected routes
* Working with TanStack Query
* Implementing teacher data fetching
* Handling loading and error states
* Working with Git and GitHub
* Fixing bugs and integrating features into the application

---

# 📸 Screenshots

### Home Page

[Add screenshot]

### Teachers Page

[Add screenshot]

### Favorites Page

[Add screenshot]

### Authentication

[Add screenshot]

---

# 🔗 Project Links

* **Live Demo:** [Add link]
* **GitHub Repository:** [Add link]
* **Figma:** [Add link]
* **Technical Specification:** [Add link]

---

## 👨‍💻 Team

This project was created as a team project by frontend developers.

**School of the Future** — language learning platform.
