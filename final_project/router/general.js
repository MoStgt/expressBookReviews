const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  res.send(books)
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
    const isbn = req.params.isbn;
    res.send(books[isbn])
 });
  
// Get book details based on author
public_users.get('/author/:author', (req, res) => {
    const author = req.params.author;
    let booksFiltered = Object.values(books).filter(book => book.author === author).map(book => ({
      title: book.title,
      reviews: book.reviews
    }));
  
    if (booksFiltered.length) {
      res.json(booksFiltered);
    } else {
      res.status(404).json({message: "Keine Bücher von diesem Autor gefunden"});
    }
  });

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title = req.params.title;
    let booksFiltered = Object.values(books).filter(book => book.title === title).map(book => ({
      author: book.author,
      reviews: book.reviews
    }));
  
    if (booksFiltered.length) {
      res.json(booksFiltered);
    } else {
      res.status(404).json({message: "Keine Bücher mit diesem Titel gefunden"});
    }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  let isbn = req.params.isbn;
  res.send(books[isbn]["reviews"])

});

module.exports.general = public_users;
