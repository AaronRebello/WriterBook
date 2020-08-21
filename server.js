
const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Handlebars = require("handlebars");
const passport = require('passport');
const methodOverride = require("method-override");
const session = require('express-session');
const flash = require('express-flash');
const cookieParser = require('cookie-parser');

const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");



const app = express();

const PORT = process.env.PORT || 5000;

// ******* in Terminal to run server - npm run server , node server.js **********

app.listen(PORT, ()=> {
  console.log(`port is running on ${PORT}`)
});

const Keys = require("./config/keys");
mongoose
  .connect(Keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log(err));



// requiring mongoose model
// const Content = require("../models/ContentModel");

const User = require("./models/UserModel");


// Handlebars helpers
const {stripTags,truncate,formatDate,editIcon} = require('./Helper/tags')

// template setup
app.engine(
  "handlebars",
  exphbs({
    helpers:{
      stripTags,
      truncate,
      formatDate,
      editIcon
    },
    
      handlebars: allowInsecurePrototypeAccess(Handlebars)
    
  })
);
app.set("view engine", "handlebars");

// {
//   handlebars: allowInsecurePrototypeAccess(Handlebars),
// }

//body parser setup

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//method overirde
app.use(methodOverride("_method"));

app.use(cookieParser());

// // session
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,

}))

// //passport-session

// require('./config/passport')(passport)

app.use(passport.initialize());
app.use(passport.session());


// app.use(express.static(path.join(__dirname,'public')));

app.use(express.static("./public"));

// // flash
app.use(flash())

//golabal variable 
app.use((req,res,next) => {
  res.locals.success_msg = req.flash('success_msg')
  res.locals.error_msg = req.flash('error_msg')
  res.locals.error = req.flash('error')
  res.locals.user =  req.user || null
  next()
})

require('./config/passport')(passport)




// const TaskRoute = require('./router/TaskRoute')
// const UserRoute = require('./router/UserRoute')

// app.use('/',TaskRoute,UserRoute)

const Auth = require('./routes/Auth');
const Content = require('./routes/Content');
// const Dashboard = require('./routes/Dashboard');
// const contentwriting = require('./routes/Show');
// const edit = require('./routes/edit');
// const add = require('./routes/Add')

app.use ("/",Auth,Content);



// const dashboard = require('./routes/Dashboard');
// app.use (Dashboard);
