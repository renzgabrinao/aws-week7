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
  const movieName = body.movieName;
  const id = body.id;

  await pool.query("UPDATE movies SET movieName = ? WHERE id = ?", [
    movieName,
    id,
  ]);

  /* */
  const [rows] = await pool.query("SELECT * FROM movies WHERE id = ?", [id]);
  const movie = rows[0];
  /* */

  const response = {
    statusCode: 201,
    body: JSON.stringify(movie),
  };

  return response;
};
