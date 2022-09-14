import { ObjectId } from "mongodb";
import  {client}  from "./index.js";

export async function updateMovieById(id, data) {
  return await client
    .db("b32we")
    .collection("movies")
    .updateOne({_id: ObjectId(id)}, { $set: data });
}
export async function createMovies(data) {
  return await client
    .db("b32we")
    .collection("movies")
    .insertMany(data);
}
export async function deleteMovieById(id) {
  return await client
    .db("b32we")
    .collection("movies")
    .deleteOne({_id: ObjectId(id)});
}
export async function getMovieById(id) {
  return await client
    .db("b32we")
    .collection("movies")
    .findOne({ _id: ObjectId(id) });
}
export async function getAllMovies(req) {
  return await client
    .db("b32we")
    .collection("movies")
    .find(req.query)
    .toArray();
}
export { ObjectId };