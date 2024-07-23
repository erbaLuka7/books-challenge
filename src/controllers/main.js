const bcryptjs = require('bcryptjs');
const db = require('../database/models');
const { Op } = require('sequelize');
const mainController = {
  home: (req, res) => {
    db.Book.findAll({
      include: [{ association: 'authors' }]
    })
      .then((books) => {
        res.render('home', { books });
      })
      .catch((error) => console.log(error));
  },
  bookDetail: (req, res) => {
    // Implement look for details in the database
    db.Book.findByPk(req.params.id,{include:[{association:"authors"}]})
    .then((book) => {
      res.render('bookDetail', {book})
    })
    .catch((error) => console.log(error)); 
  },
  bookSearch: (req, res) => {
    res.render('search', { books: null});
  },
  bookSearchResult: (req, res) => {
    // Implement search by title
    const bookSearch = req.body.title;

  db.Book.findAll({
    where: {
      title: {
        [Op.like]: `%${bookSearch}%`
      }
    }
  })
  .then((books) => {
    res.render('search', { books });
  })
  .catch((error) => console.log(error)); 
  },
  deleteBook: (req, res) => {
    // Implement delete book
    res.render('home');
  },
  authors: (req, res) => {
    db.Author.findAll()
      .then((authors) => {
        res.render('authors', { authors });
      })
      .catch((error) => console.log(error));
  },
  authorBooks: (req, res) => {
    // Implement books by author
    db.Author.findByPk(req.params.id, {
      include: [{association:"books"}]
    })
    .then((author) => {
      res.render('authorBooks', { author });
    })
    .catch((error) => console.log(error));
  },
  register: (req, res) => {
    res.render('register');
  },
  processRegister: (req, res) => {
    db.User.create({
      Name: req.body.name,
      Email: req.body.email,
      Country: req.body.country,
      Pass: bcryptjs.hashSync(req.body.password, 10),
      CategoryId: req.body.category
    })
      .then(() => {
        res.redirect('/');
      })
      .catch((error) => console.log(error));
  },
  login: (req, res) => {
    // Implement login process
    res.render('login');
  },
  processLogin: (req, res) => {
    // Implement login process
    res.render('home');
  },
  edit: (req, res) => {
    // Implement edit book
    db.Book.findByPk(req.params.id, {
      include: [{association:"authors"}]
    })
    .then((book) => {
      res.render('editBook', {book})
    })
    .catch((error) => console.log(error));
  },
  processEdit: async (req, res) => {
    // Implement edit book
    try {
      const {title, cover, description} = req.body;

      await db.Book.update({
          title: title,
          cover: cover,
          description: description
      }, {
          where: {id: req.params.id}
      });
      res.redirect('/');
  } catch (error) {
      console.log(error);
  }
}

};

module.exports = mainController;
