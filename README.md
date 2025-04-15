# CIS 498: Dev Tools Selling Platform

## Set up

### Clone the repository

```bash
git clone https://github.com/daniiprietoo/cis498-final-project
cd cis498-final-project
```

### Install dependencies
```bash
npm install
```

### Run the application
```bash
npm run dev
```

## Authentication & Database

### Authentication
-   **Framework:** Implemented using **NextAuth.js (Auth.js)** for handling user sessions and authentication flows.
-   **Providers:** Supports both **Credentials** (email/password) and **GitHub OAuth** for user sign-in and registration.
-   **Session Strategy:** Uses **JSON Web Tokens (JWT)** for managing sessions.
-   **Roles:** Includes basic role management within the JWT (`USER`, `BUSINESS`, `ADMIN`) to differentiate user types.

### Database
-   **Database System:** Uses **PostgreSQL** for data persistence.
-   **ORM:** **Prisma** is utilized as the Object-Relational Mapper (ORM) for database interactions, schema management, and migrations.
-   **Schema:** The database schema (`prisma/schema.prisma`) defines models for Users, Businesses, Products, Orders, Reviews, and Support Requests, reflecting the project requirements.