require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const Blog = require('./models/blog');
const blogRouter = require("./routes/blogs");
const methodOverride = require('method-override');
const app = express();

const PORT = 5000;

const mongoDbAtlasUri = process.env.MONGODB_ATLAS_URI;

mongoose
  .connect(mongoDbAtlasUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));

app.use(methodOverride('_method'));

app.get("/", async (req, res) => {
  const blogs = await Blog.find().sort({ createdAt: 'desc' });
  res.render("index", { blogs: blogs });
});

app.use("/blogs", blogRouter);

app.listen(PORT);
