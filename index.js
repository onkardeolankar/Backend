// const express = require("express");
import express from "express";
import { MongoClient } from "mongodb";
import dotenv from 'dotenv';
// import {HelpCount} from "./helper.js";
import {moviesRouter} from "./movies.js";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
dotenv.config();

// console.log(process.env.MONGO_URL);

const app = express();

// const PORT = 4000;
const PORT = process.env.PORT;
// const movies = [
//   {
//     id: "100",
//     name: "RRR",
//     poster:
//       "https://englishtribuneimages.blob.core.windows.net/gallary-content/2021/6/Desk/2021_6$largeimg_977224513.JPG",
//     rating: 8.8,
//     summary:
//       "RRR is an upcoming Indian Telugu-language period action drama film directed by S. S. Rajamouli, and produced by D. V. V. Danayya of DVV Entertainments.",
//     trailer: "https://www.youtube.com/embed/f_vbAtFSEc0",
//   },
//   {
//     id: "101",
//     name: "Iron man 2",
//     poster:
//       "https://m.media-amazon.com/images/M/MV5BMTM0MDgwNjMyMl5BMl5BanBnXkFtZTcwNTg3NzAzMw@@._V1_FMjpg_UX1000_.jpg",
//     rating: 7,
//     summary:
//       "With the world now aware that he is Iron Man, billionaire inventor Tony Stark (Robert Downey Jr.) faces pressure from all sides to share his technology with the military. He is reluctant to divulge the secrets of his armored suit, fearing the information will fall into the wrong hands. With Pepper Potts (Gwyneth Paltrow) and Rhodes (Don Cheadle) by his side, Tony must forge new alliances and confront a powerful new enemy.",
//     trailer: "https://www.youtube.com/embed/wKtcmiifycU",
//   },
//   {
//     id: "102",
//     name: "No Country for Old Men",
//     poster:
//       "https://upload.wikimedia.org/wikipedia/en/8/8b/No_Country_for_Old_Men_poster.jpg",
//     rating: 8.1,
//     summary:
//       "A hunter's life takes a drastic turn when he discovers two million dollars while strolling through the aftermath of a drug deal. He is then pursued by a psychopathic killer who wants the money.",
//     trailer: "https://www.youtube.com/embed/38A__WT3-o0",
//   },
//   {
//     id: "103",
//     name: "Jai Bhim",
//     poster:
//       "https://m.media-amazon.com/images/M/MV5BY2Y5ZWMwZDgtZDQxYy00Mjk0LThhY2YtMmU1MTRmMjVhMjRiXkEyXkFqcGdeQXVyMTI1NDEyNTM5._V1_FMjpg_UX1000_.jpg",
//     summary:
//       "A tribal woman and a righteous lawyer battle in court to unravel the mystery around the disappearance of her husband, who was picked up the police on a false case",
//     rating: 8.8,
//     trailer: "https://www.youtube.com/embed/nnXpbTFrqXA",
//   },
//   {
//     id: "104",
//     name: "The Avengers",
//     rating: 8,
//     summary:
//       "Marvel's The Avengers (classified under the name Marvel Avengers\n Assemble in the United Kingdom and Ireland), or simply The Avengers, is\n a 2012 American superhero film based on the Marvel Comics superhero team\n of the same name.",
//     poster:
//       "https://terrigen-cdn-dev.marvel.com/content/prod/1x/avengersendgame_lob_crd_05.jpg",
//     trailer: "https://www.youtube.com/embed/eOrNdBpGMv8",
//   },
//   {
//     id: "105",
//     name: "Interstellar",
//     poster: "https://m.media-amazon.com/images/I/A1JVqNMI7UL._SL1500_.jpg",
//     rating: 8.6,
//     summary:
//       "When Earth becomes uninhabitable in the future, a farmer and ex-NASA\n pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team\n of researchers, to find a new planet for humans.",
//     trailer: "https://www.youtube.com/embed/zSWdZVtXT7E",
//   },
//   {
//     id: "106",
//     name: "Baahubali",
//     poster: "https://flxt.tmsimg.com/assets/p11546593_p_v10_af.jpg",
//     rating: 8,
//     summary:
//       "In the kingdom of Mahishmati, Shivudu falls in love with a young warrior woman. While trying to woo her, he learns about the conflict-ridden past of his family and his true legacy.",
//     trailer: "https://www.youtube.com/embed/sOEg_YZQsTI",
//   },
//   {
//     id: "107",
//     name: "Ratatouille",
//     poster:
//       "https://resizing.flixster.com/gL_JpWcD7sNHNYSwI1ff069Yyug=/ems.ZW1zLXByZC1hc3NldHMvbW92aWVzLzc4ZmJhZjZiLTEzNWMtNDIwOC1hYzU1LTgwZjE3ZjQzNTdiNy5qcGc=",
//     rating: 8,
//     summary:
//       "Remy, a rat, aspires to become a renowned French chef. However, he fails to realise that people despise rodents and will never enjoy a meal cooked by him.",
//     trailer: "https://www.youtube.com/embed/NgsQ8mVkN8w",
//   },
// ];

const mobiles = [
  {
    model: "OnePlus 9 5G",
    img: "https://m.media-amazon.com/images/I/61fy+u9uqPL._SX679_.jpg",
    company: "Oneplus",
  },
  {
    model: "Iphone 13 mini",
    img: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-13-mini-blue-select-2021?wid=470&hei=556&fmt=jpeg&qlt=95&.v=1645572315986",
    company: "Apple",
  },
  {
    model: "Samsung s21 ultra",
    img: "https://m.media-amazon.com/images/I/81kfA-GtWwL._SY606_.jpg",
    company: "Samsung",
  },
  {
    model: "Xiomi mi 11",
    img: "https://m.media-amazon.com/images/I/51K4vNxMAhS._AC_SX522_.jpg",
    company: "Xiomi",
  },
];
app.use(express.json());
const corsOptions ={
  origin:'*', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}

app.use(cors(corsOptions));
// const PORT = process.env.PORT;

// const MONGO_URL = "mongodb://localhost:27017";
// const MONGO_URL = "mongodb+srv://Onkar:F5Z6B0KarUxuqzhJ@cluster0.roxwh.mongodb.net";
const MONGO_URL = process.env.MONGO_URL;

async function createConnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("Mongo is connected");
  return client;
}

const client = await createConnection();

app.get("/", function (req, res) {
  res.send("Welcome to our World");
});

app.use('/movies', moviesRouter);
// app.use('/movies', HelpCount);
app.listen(PORT, () => console.log(`App Started in ${PORT}`));

app.get("/mobiles", async function (req, res){

  const mobiles = await client
  .db("b32we")
  .collection("mobiles")
  .find({})
  .toArray();

  res.send(mobiles);
});

app.post("/mobiles", express.json(), async function (req, res){
  const data = req.body;
  const result = await client
  .db("b32we")
  .collection("mobiles")
  .insertMany(data);

  res.send(result);
});
async function generateHashedPAssword(password){
  const NO_OF_ROUNDS = 10;
  const salt = await bcrypt.genSalt(NO_OF_ROUNDS);
  const hashedPassword = await bcrypt.hash(password, salt);
  console.log(salt, hashedPassword);
  return hashedPassword
}

// app.post("/signup", async function(req,res){
//   const {username,password}= req.body;
//   const hashedPassword = await generateHashedPAssword("Password@12345");
//   const output= await client.db("b32we").collection("users").insertOne({username : username , password : hashedPassword });
//   res.send(output);
// });

app.post("/signup", async function(req,res){
  const {username,password}= req.body;
  const output1= await client.db("b32we").collection("users").findOne({username : username });
  if(output1){
    res.send({message: "Username already exits"}); 
  }
  else if(password.length < 8){
    res.status(400).send({message : "Password must be greater than 8 characters"});

  }
  else{
    const hashedPassword = await generateHashedPAssword(password);
    const output= await client.db("b32we").collection("users").insertOne({username : username , password : hashedPassword });
    res.send(output);
  }
});
app.post("/login", async function(req,res){
  const {username,password}= req.body;
  const output1= await client.db("b32we").collection("users").findOne({username : username });
  console.log(output1);
  if(!output1){
    res.status(401).send({message : "Invalid Credentials"});
  }else{
    const storedPassword = output1.password;
    const isPasswordMatched = await bcrypt.compare(password,storedPassword);
    console.log(isPasswordMatched);
    if(isPasswordMatched){
      const token = jwt.sign({id : output1._id},process.env.SECRET_KEY);
      res.send({msg : "Successful Login", token: token});
    }else{
      res.status(401).send({message : "Invalid Credentials"});
    }
  }
});
export {client};

