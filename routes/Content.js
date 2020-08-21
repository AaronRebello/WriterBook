const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
// const Content = mongoose.model('Content');

const { ensureAuthenticated } = require("../Helper/authHelper");

const Content = require("../models/ContentModel");
const { populate } = require("../models/ContentModel");


router.get("/userContent", ensureAuthenticated, (req, res) => {
  Content.find({ userId: req.user._id }).then((content) => {
    console.log(content);
  });
});

//************************** */ Comment***********

router.post("/comments/:id", ensureAuthenticated, (req, res) => {
  Content.findOne({ _id: req.params.id }).then((content) => {
    const newComment = {
      commentBody: req.body.commentBody,
      commentingUser : req.user.id
    };
    content.comments.unshift(newComment);

    content
      .save()
      .then((content) => {
        // console.log(content);
        res.redirect("/newsfeed");
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

// router.delete("/data.comments/:id",ensureAuthenticated,(req,res)=>{
//   Content.findOneAndRemove({_id: req.params.id})
//   .then(() =>{
//     res.redirect("/show");
//   })
//   .catch((err)=>console.log(err))
// })


//********************************** */ newsfeed***************************

router.get("/newsfeed", ensureAuthenticated, (req, res) => {
  Content.find({ status: "Public" })
    .populate("user")
    .then((data) => {

      // console.log(data);
      res.render("newsfeed/index", {
        data,
      });
    });
});

router.get("/user/:id",ensureAuthenticated,(req, res)=>{
  Content.find({
    user: req.params.id,
    status:"Public",
    // status:'Private',
  })
  .populate('user')
  .then((data)=>{
    // console.log(data);
    res.render("newsfeed/index",{
      data,
    });
  });
});


//**************************************************** */ dashboard******************

router.get("/dashboard", ensureAuthenticated, (req, res) => {
  Content.find({ user: req.user.id }).then((data) => {
    // console.log(data);
    res.render("unAuthenticated/dashboard", {
      data,
      name: req.user.name,
    });
  });
});

router.delete("/data/:id",ensureAuthenticated,(req,res)=>{
  Content.deleteOne({_id: req.params.id})
  .then((data)=>{
    res.redirect("/dashboard");
  }).catch((err)=>console.log(err))
})

//************************************************** */ edit*****************************

// router.get("/edit", ensureAuthenticated, (req, res) => {
//   res.render("newsfeed/edit");
// });

router.get("/edit/content/:id", ensureAuthenticated, (req, res) => {
Content.findOne({_id : req.params.id})
.then((data)=>{
  // console.log(data);
res.render("newsfeed/edit",{
  data,
})

})
});


router.put("/edit/:id", ensureAuthenticated, (req,res) =>{
  Content.findOne({_id : req.params.id})
  .then((data)=>{
    data.title = req.body.title
    data.description = req.body.body
    data.save()
  .then((data)=>{
    res.redirect("/dashboard")
  })
})
})





//*************************************** */ show********************************************
router.get("/show/:id", ensureAuthenticated, (req, res) => {
  // res.render("newsfeed/show");
  Content.findOne({_id:req.params.id})
    .populate("user")
    .populate('comments.commentingUser')
    .then((data)=>{
      // console.log(data.comments);
    res.render("newsfeed/show",{
     data,
    })
  })
});




//******************************************** */ add**********************************

router.get("/add", ensureAuthenticated, (req, res) => {
  res.render("newsfeed/add");
});


router.post("/add", ensureAuthenticated, (req, res) => {
  let errors = [];

  if (!req.body.title) {
    errors.push({ text: "Title should not be empty" });
  }
  if (!req.body.body) {
    errors.push({ text: "Details should not be empty" });
  }
  if (errors.length > 0) {
    res.render("add", {
      title: req.body.title,
      description: req.body.body,
      errors: errors,
    });
  } else {
    const newContent = {
      title: req.body.title,
      description: req.body.body,
      status: req.body.status,
      commentAllowance: Boolean(req.body.allowComments),
      user: req.user.id,
      // date: req.body.Date.now()
    };
    const content = new Content(newContent);
    content
      .save()
      .then((data) => {
        // req.flash('success_msg','Task addedd successfully')
        res.redirect("/dashboard");
      })
      .catch((err) => console.log(err));
  }
});

// **********************************about**************************************
router.get("/about",ensureAuthenticated, (req, res) => {
  res.render("unAuthenticated/about");
});

module.exports = router;
