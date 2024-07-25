const express = require('express');
const mainRouter = require('./routes/main');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const insertDataLocals = require('./middlewares/validations/insertDataLocals');
const checkCookie = require('./middlewares/validations/checkCookie');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser())
app.use(session({secret:"secret word"}))

app.use(checkCookie)
app.use(insertDataLocals)

app.set('view engine', 'ejs');
app.set('views', 'src/views');

app.use('/', mainRouter);

app.listen(3000, () => {
  console.log('listening in http://localhost:3000');
});
