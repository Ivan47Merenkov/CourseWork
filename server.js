import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import pkg from 'pg';
const { Pool } = pkg;

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

app.get('/', (req, res) => {
  res.send('Сервер работает. Используйте /register для регистрации или /users для просмотра зарегистрированных пользователей.');
});

app.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT id, name, email, district, phone FROM users ORDER BY id ASC');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Ошибка при получении списка пользователей:', err);
    res.status(500).json({ error: 'Внутренняя ошибка сервера.' });
  }
});

app.post('/register', async (req, res) => {
  try {
    const { name, email, district, phone, password } = req.body;

    if (!name || !email || !district || !phone || !password) {
      return res.status(400).json({ error: 'Все поля обязательны для заполнения.' });
    }

    const existingUser = await pool.query(
      'SELECT * FROM users WHERE email = $1 OR phone = $2',
      [email, phone]
    );
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: 'Пользователь с таким email или телефоном уже существует.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      'INSERT INTO users (name, email, district, phone, password) VALUES ($1, $2, $3, $4, $5) RETURNING id',
      [name, email, district, phone, hashedPassword]
    );

    res.status(201).json({ userId: result.rows[0].id });
  } catch (err) {
    console.error('Ошибка при регистрации пользователя:', err);
    res.status(500).json({ error: 'Внутренняя ошибка сервера.' });
  }
});

app.post('/orders', async (req, res) => {
  try {
    const { furniture_type, has_project, wishes, wall_length, ceiling_height } = req.body;

    if (!furniture_type || wall_length == null || ceiling_height == null) {
      return res.status(400).json({ error: 'Все поля обязательны для заполнения.' });
    }

    const result = await pool.query(
      'INSERT INTO orders (furniture_type, has_project, wishes, wall_length, ceiling_height, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
      [furniture_type, has_project, wishes, wall_length, ceiling_height, 1]  // 1 — это ID пользователя, можно заменить на динамическое значение
    );

    res.status(201).json({ orderId: result.rows[0].id });
  } catch (err) {
    console.error('Ошибка при создании заказа:', err);
    res.status(500).json({ error: 'Внутренняя ошибка сервера.' });
  }
});

app.post('/footer-inquiries', async (req, res) => {
  try {
    const { question, phone, preferredTime } = req.body;

    if (!phone || !preferredTime) {
      return res.status(400).json({ error: 'Номер телефона и время обязательны для заполнения.' });
    }

    const result = await pool.query(
      'INSERT INTO footer_inquiries (question, phone, preferred_time) VALUES ($1, $2, $3) RETURNING id',
      [question, phone, preferredTime]
    );

    res.status(201).json({ inquiryId: result.rows[0].id });
  } catch (err) {
    console.error('Ошибка при сохранении данных из футера:', err);
    res.status(500).json({ error: 'Внутренняя ошибка сервера.' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));