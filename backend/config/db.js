const Pool = require("pg").Pool;
const dotenv = require("dotenv");
dotenv.config();

const pool = new Pool({
  host:process.env.SUPABASE_HOST,
  port:process.env.SUPABASE_PORT,
  password: process.env.SUPABASE_PASSWORD,
  database:process.env.SUPABASE_DB,
  user:process.env.SUPABASE_USER,
  pool_mode:process.env.SUPABASE_pool_mood
});

module.exports = pool;