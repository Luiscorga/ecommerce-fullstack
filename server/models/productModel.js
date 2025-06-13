const db = require('../config/database');

exports.getAll = () => db.query('SELECT * FROM products');

exports.getById = (id) =>
  db.query('SELECT * FROM products WHERE id = ?', [id]);

exports.create = (product) =>
  db.query(
    'INSERT INTO products (brand, model, description, price, stock, image_url) VALUES (?, ?, ?, ?, ?, ?)',
    [product.brand, product.model, product.description, product.price, product.stock, product.image_url]
  );

exports.update = (id, product) =>
  db.query(
    'UPDATE products SET brand = ?, model = ?, description = ?, price = ?, stock = ?, image_url = ? WHERE id = ?',
    [product.brand, product.model, product.description, product.price, product.stock, product.image_url, id]
  );

exports.remove = (id) =>
  db.query('DELETE FROM products WHERE id = ?', [id]);