'use strict'

var express = require('express');
var router = express.Router();
var user = require('../models/institution.js')
const passport = require('passport')


let ModelInstitution = require('../models/institution.js')


let viewIndex = (req, res, next) => {
  res.render('index', {title: "mediary"})
}

let formLogin = (req, res, next) => {
  res.render('formLogin', {title: "mediary"})
}

let processLogin = (req, res, next) => {
  req.session.save((err) => {
    if(err){
      console.log(err);
    }else{
      res.redirect('/dashboard')
    }
  })
}

let formRegister = (req, res, next) => {
  res.render('formRegister', {title: "mediary"})
}

let proccessRegister = (req, res, next) => {
  ModelInstitution.register({
    IID: req.body.iid,
    name: req.body.name,
    address: req.body.address,
    type: req.body.type,
    username: req.body.username
  }, req.body.password, function(err, result) {
    if (err) {
      res.render('/register', {alert: 'Registration unsuccessfull'})
    } else {
      passport.authenticate('local')(req, res, function(){
        req.session.save(function (err, next) {
          if (err) return next(err)
          res.redirect('/patient')
        })
      })
    }
  })

}

module.exports = {
  viewIndex: viewIndex,
  formLogin: formLogin,
  processLogin: processLogin,
  formRegister: formRegister,
  proccessRegister: proccessRegister
}
