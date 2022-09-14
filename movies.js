import express from "express";
import { auth } from "./auth.js";
import { getAllMovies, getMovieById, deleteMovieById, createMovies, updateMovieById } from "./helper.js";
const router = express.Router();
router.get("/", auth, async function (req, res) {

    if(req.query.rating){
        req.query.rating = + req.query.rating;
   }
      console.log(req.query);
       const movies1 = await getAllMovies(req);

        res.send(movies1);
    });
   
   router.get("/:id", auth, async function (req, res) {
     const { id } = req.params;
     console.log(req.params, id);
   
     // const movie =movies.find((mv) => mv.id == id);
     //  res.send(movie);
     const movie = await getMovieById(id);
       console.log(movie);
   
     movie ? res.send(movie) : res.send({ msg: "Movie not found" });
     res.send(movie);
   });
   
   router.delete("/:id",auth, async function (req, res) {
    const { id } = req.params;
    console.log(req.params, id);
  
    // const movie =movies.find((mv) => mv.id == id);
    //  res.send(movie);
    const resulting = await deleteMovieById(id);
    console.log(result);
    resulting.deletedCount > 0
    ? res.send({ msg: "Movie deleted sucessfully"})
    : res.send({ msg: "Movie not found"});

  });

   //Create Movies
   router.post("/", express.json(),auth, async function (req, res) {
     const data = req.body;
     const result = await createMovies(data);
     res.send(result);
   });
   
   router.put("/:id",auth, async function (req, res) {
    const { id } = req.params;
    const data = req.body;
  
    // const movie =movies.find((mv) => mv.id == id);
    //  res.send(movie);
    const crystal = await updateMovieById(id, data);
    res.send(crystal);
});

   export const moviesRouter = router;
