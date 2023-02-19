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
  const movieName = body.name;
  const result = await pool.query("INSERT INTO movies (movieName) VALUES (?)", [
    movieName,
  ]);

  /* */
  const [rows] = await pool.query("SELECT * FROM movies WHERE id = ?", [
    result[0].insertId,
  ]);
  const movie = rows[0];
  /* */

  const response = {
    statusCode: 201,
    body: JSON.stringify(movie),
  };
  return response;
};
