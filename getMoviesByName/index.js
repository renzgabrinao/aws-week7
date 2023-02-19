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
  const movieName = event.movieName;

  const [movies] = await pool.query(
    "SELECT * FROM movies WHERE movieName = ?",
    [movieName]
  );

  const response = {
    statusCode: 200,
    body: movies[0],
  };
  return response;
  // return event.movieName;
};
