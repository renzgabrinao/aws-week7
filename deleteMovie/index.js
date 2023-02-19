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
  const body = JSON.parse(event.body);
  const id = body.id;
  await pool.query("DELETE FROM movies WHERE id = ?", [id]);

  /* */
  const [rows] = await pool.query("SELECT * FROM movies");
  const movies = rows[0];
  /* */

  const response = {
    statusCode: 201,
    body: JSON.stringify(movies),
  };
  return response;
};
