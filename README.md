# SM Retail Exam

A full-stack web application built with **Laravel**, **React**, and **Tailwind CSS** wherein users may be able to register and login using email and password. Upon login, users will be redirected to a dashboard with their details.

---

## Requirements

- PHP >= 8.2
- Composer
- Node.js >= 18
- A database supported by Laravel (MySQL, PostgreSQL, SQLite, etc.)

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/eduvanekyle/smretail-exam.git
cd smretail-exam
```

### 2. Install PHP dependencies

```bash
composer install
```

### 3. Install Node dependencies

```bash
npm install
```

### 4. Environment setup

```bash
cp .env.example .env
php artisan key:generate
```

Then open `.env` and configure your database connection:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=smretail_exam
DB_USERNAME=root
DB_PASSWORD=
```

### 5. Run migrations

```bash
php artisan migrate
```

### 6. Start the development servers

In one terminal, start the Laravel backend:

```bash
php artisan serve
```

In another terminal, start the Vite frontend:

```bash
npm run dev
```

Visit [http://localhost:8000](http://localhost:8000) in your browser.

---

## Notes

- Passwords are encrypted at rest using Laravel's `Crypt` facade.
- Sanctum tokens are single-session. Logging in from a new device revokes all previous tokens.
- Rate limiting is applied: 30 req/min on auth endpoints, 60 req/min on protected endpoints.