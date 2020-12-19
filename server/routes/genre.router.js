const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

//GET all genres for specific movie id
router.get('/:id', (req, res) => {
  let id = req.params.id;
  // Get the genre names where movie.id = the id in req.params.id
  const sqlText = `SELECT name FROM "genres" 
  JOIN "movie_genre" ON genres.id = movie_genre.genre_id
  JOIN "movies" ON movie_genre.movie_id = movies.id
  WHERE movies.id = $1;`;
  //pool is the database, here we are sending the query to the database, running a query similar to a command in Postico
  pool.query(sqlText, [id])
      .then((result) => {
          res.send(result.rows); 
      })
      .catch((error) => {
          console.log(`Error making database query in GET ${sqlText}`, error);
          res.sendStatus(500);
      });   
}); // END GET Route

module.exports = router;