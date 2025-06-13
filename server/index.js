const express = require("express")
const cors = require("cors");
const dotenv = require("dotenv")
const pool = require('./config/database');

const app = express();

dotenv.config()

const PORT = process.env.PORT;
app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth');
const protectedRoutes = require('./routes/protected');


//app.use("/api/products", require("./routes/productRoutes"));
//app.use("/api/users", require("./routes/userRoutes"));
app.use('/api/auth', authRoutes);
app.use('/api', protectedRoutes);


(async () => {
  try {
    const [rows] = await pool.query('SELECT 1 + 1 AS solution');
    console.log('DB connected, test query result:', rows[0].solution);
  } catch (err) {
    console.error('DB connection failed:', err);
  }
})();


app.get("/api/home", (req, res) => {
    res.json({ message: "Hello World", products: ["PC", "Phone", "Tablet"]});
})

app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
})