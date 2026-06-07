DROP TABLE IF EXISTS orders_archive;
DROP TABLE IF EXISTS orders;

CREATE TABLE orders (
  id BIGSERIAL PRIMARY KEY,
  store_id INT NOT NULL,
  store_name VARCHAR(120) NOT NULL,
  item_id INT NOT NULL,
  item_name VARCHAR(150) NOT NULL,
  quantity INT NOT NULL CHECK (quantity > 0),
  unit_price NUMERIC(12,2) NOT NULL CHECK (unit_price >= 0),
  total_amount NUMERIC(12,2) GENERATED ALWAYS AS (quantity * unit_price) STORED,
  order_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  customer_email VARCHAR(160),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE orders_archive (
  id BIGINT PRIMARY KEY,
  store_id INT NOT NULL,
  store_name VARCHAR(120) NOT NULL,
  item_id INT NOT NULL,
  item_name VARCHAR(150) NOT NULL,
  quantity INT NOT NULL CHECK (quantity > 0),
  unit_price NUMERIC(12,2) NOT NULL CHECK (unit_price >= 0),
  total_amount NUMERIC(12,2) NOT NULL,
  order_date TIMESTAMPTZ NOT NULL,
  customer_email VARCHAR(160),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  archived_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Performance indexes for archival and analytics queries
CREATE INDEX idx_orders_order_date ON orders(order_date);
CREATE INDEX idx_orders_store_date ON orders(store_id, order_date);
CREATE INDEX idx_orders_item_date ON orders(item_id, order_date);
CREATE INDEX idx_archive_order_date ON orders_archive(order_date);
CREATE INDEX idx_archive_store_date ON orders_archive(store_id, order_date);
