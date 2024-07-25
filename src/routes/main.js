const express = require('express');
const mainController = require('../controllers/main');
const loginValidation = require('../middlewares/validations/login.validation');

const router = express.Router();

router.get('/', mainController.home);
router.get('/books/detail/:id', mainController.bookDetail);
router.get('/books/search', mainController.bookSearch);
router.post('/books/search', mainController.bookSearchResult);
router.get('/authors', mainController.authors);
router.get('/authors/:id/books', mainController.authorBooks);
router.get('/users/register', mainController.register);
router.post('/users/register', mainController.processRegister);
router.get('/users/login', mainController.login);
router.post('/users/login', loginValidation, mainController.processLogin);
router.delete('/books/:id', mainController.deleteBook);
router.get('/books/edit/:id', mainController.edit);
router.post('/books/edit/:id', mainController.processEdit);

router.get('/books/delete/:id', mainController.deleteBook);
router.get('/logout', mainController.logout);

module.exports = router;
