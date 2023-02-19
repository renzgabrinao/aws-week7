import mysql from "mysql2";

const pool = mysql
  .createPool({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
    port: process.env.MYSQLPORT || 3306,
  })
  .promise();

export const handler = async (event) => {
  const [movies] = await pool.query("SELECT * FROM movies");

  const response = {
    statusCode: 200,
    body: JSON.stringify(movies),
  };
  return response;
};
