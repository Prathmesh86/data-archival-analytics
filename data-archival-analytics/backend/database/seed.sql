INSERT INTO orders (store_id, store_name, item_id, item_name, quantity, unit_price, order_date, customer_email)
SELECT
  (ARRAY[101,102,103,104,105])[floor(random() * 5 + 1)],
  (ARRAY['Pune Central','Mumbai Express','Kolhapur Fresh','Nashik Mart','Nagpur Hub'])[floor(random() * 5 + 1)],
  (ARRAY[1,2,3,4,5,6,7,8,9,10])[floor(random() * 10 + 1)],
  (ARRAY['Wireless Mouse','Mechanical Keyboard','USB-C Cable','Laptop Stand','Webcam','Headphones','SSD 512GB','Monitor 24 inch','Office Chair','Notebook'])[floor(random() * 10 + 1)],
  floor(random() * 5 + 1)::int,
  (ARRAY[299,499,699,999,1299,1599,2499,3999,5999,8999])[floor(random() * 10 + 1)]::numeric,
  NOW() - (floor(random() * 75) || ' days')::interval,
  'customer' || generate_series || '@example.com'
FROM generate_series(1, 350);
