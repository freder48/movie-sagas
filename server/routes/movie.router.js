const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.post('/', (req, res) => {
  console.log('req.body is:', req.body);
  // RETURNING "id" will give us back the id of the created movie
  const insertMovieQuery = `
  INSERT INTO "movies" ("title", "poster", "description")
  VALUES ($1, $2, $3)
  RETURNING "id";`

  // FIRST QUERY MAKES MOVIE
  pool.query(insertMovieQuery, [req.body.movie.title, req.body.movie.poster, req.body.movie.description])
    .then(result => {
      console.log('New Movie Id:', result.rows[0].id); //ID IS HERE!

      const createdMovieId = result.rows[0].id

      // Depending on how you make your junction table, this insert COULD change.
      const insertMovieGenreQuery = `
      INSERT INTO "movie_genre" ("movie_id", "genre_id")
      VALUES  ($1, $2);
      `
      // SECOND QUERY MAKES GENRE FOR THAT NEW MOVIE
      pool.query(insertMovieGenreQuery, [createdMovieId, req.body.movie.genre_id]).then(result => {
        //Now that both are done, send back success!
        res.sendStatus(201);
      }).catch(err => {
        // catch for second query
        console.log(err);
        res.sendStatus(500)
      })

      // Catch for first query
    }).catch(err => {
      console.log(err);
      res.sendStatus(500)
    })
})

//GET ALL MOVIES
router.get('/', (req, res) => {
  // Get all of the movies from the database
  const sqlText = `SELECT * FROM movies ORDER BY title`;
  //pool is the database, here we are sending the query to the database, running a query similar to a command in Postico
  pool.query(sqlText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      s
      console.log(`Error making database query in GET ${sqlText}`, error);
      res.sendStatus(500);
    });
}); // END GET Route

//Get movie details for specific movie id
router.get('/:id', (req, res) => {
  let id = req.params.id;
  console.log('GET SPECIFIC MOVIE', id);
  
  const sqlText = `SELECT * FROM movies WHERE id=$1`;
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

//PUT ROUTE - change movie details
router.put('/:id', (req, res) => {
  let edit = req.body;
  console.log('req.body' ,req.body);
  
  let id = req.params.id; // identify which item to update
  console.log('id:', id);
  
  let sqlText = `UPDATE "movies" SET "title" =$1, "description" =$2 WHERE "id" = $3;`
  pool.query(sqlText, [edit.title, edit.description, id]) 
      .then((result) => { 
          res.sendStatus(200); 
      })
      .catch( (error) => {
          console.log('Error from db...', error);
          res.sendStatus(500);
      })
})

//GET ALL MOVIES
router.get('/search/:search', (req, res) => {
  let search = req.params.search
  // Get all the movies where search is true
  const sqlText = `SELECT * FROM movies WHERE title ILIKE '%' || $1 || '%';`;
  //pool is the database, here we are sending the query to the database, running a query similar to a command in Postico
  pool.query(sqlText, [search])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log(`Error making database query in SEARCH GET ${sqlText}`, error);
      res.sendStatus(500);
    });
}); // END GET Route

module.exports = router;