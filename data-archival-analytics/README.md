# Task 3: Data Archival & Analytics

Professional full-stack project for the internship assessment.

## Tech Stack

- Frontend: Next.js, React, TypeScript, Tailwind CSS, React Query, Zustand, Recharts
- Backend: Node.js, Express.js, PostgreSQL, Joi validation
- Database: PostgreSQL with indexes and optimized aggregation queries
- DevOps: Docker Compose

## Features

- `orders` and `orders_archive` tables
- `POST /api/archive-old-orders` moves orders older than 30 days to archive table
- Analytics APIs:
  - `GET /api/analytics/orders-per-day`
  - `GET /api/analytics/revenue-per-store`
  - `GET /api/analytics/top-selling-items`
  - `GET /api/analytics/summary`
- Dashboard with charts, filters, stats, and archive action
- Pagination support for analytical endpoints
- Transaction-safe archival
- Database indexes for performance
- Clean MVC-style backend structure

## Quick Run With Docker

```bash
docker compose up --build
```

Open:

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`

## Manual Run

### 1. Setup PostgreSQL

Create database:

```bash
psql -U postgres
CREATE DATABASE analytics_db;
\q
```

Run schema and seed:

```bash
cd backend
psql -U postgres -d analytics_db -f database/schema.sql
psql -U postgres -d analytics_db -f database/seed.sql
```

### 2. Backend

```bash
cd backend
copy .env.example .env
npm install
npm run dev
```

Backend runs on `http://localhost:5000`.

### 3. Frontend

```bash
cd frontend
copy .env.local.example .env.local
npm install
npm run dev
```

Frontend runs on `http://localhost:3000`.

## API Examples

Archive old orders:

```bash
curl -X POST http://localhost:5000/api/archive-old-orders
```

Orders per day:

```bash
curl "http://localhost:5000/api/analytics/orders-per-day?page=1&limit=20"
```

Revenue per store:

```bash
curl "http://localhost:5000/api/analytics/revenue-per-store?page=1&limit=20"
```

Top 5 selling items:

```bash
curl "http://localhost:5000/api/analytics/top-selling-items"
```

## Database Optimization

Indexes used:

- `idx_orders_order_date` for archival and date filtering
- `idx_orders_store_date` for revenue per store
- `idx_orders_item_date` for top selling items
- archive indexes for future archived analytics

Archival uses one SQL transaction with `DELETE ... RETURNING`, so orders are moved safely without duplicate reads.

## Assumptions

- Revenue is calculated as `quantity * unit_price`.
- Orders older than 30 days are based on `order_date`.
- Analytics are shown for active orders table. Archived data is stored separately for retention.
- Seed data is generated for demo/testing.
