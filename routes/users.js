const express = require('express');
const router = express.Router(); //express wala router handling
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const verify = require('../config/verify');


router.post("/register",function(req, res) {  //front end req eka
	const newUser = new User({
		user_name:req.body.user_name,
		shop_name:req.body.shop_name,
		shop_address:req.body.shop_address,
		registration_no:req.body.registration_no,
		phone_no:req.body.phone_no,
		email:req.body.email,
		password:req.body.password
	});

	User.saveUser(newUser,function (err,user) {
		if(err) {
			res.json({state:false,msg:"data not inserted"});
		}
		if(user) {
			res.json({state:true,msg:"data inserted"});
		}
	});
});

router.post("/login",function(req, res) {
	const email = req.body.email;
	const password = req.body.password;

	User.findByEmail(email,function (err,user) {

		if(err) throw err;

		if (!user){
			res.json({state:false,msg:"No user found"});
			return false;
		}

		User.passwordCheck(password,user.password,function (err,match) {
			if(err) throw err;

			if(match) {
				
				jwt.sign({user}, config.secret, {expiresIn:86400}, function(err,token) { //function to make tokens
	            	if (err) {
	            		throw err;
	            	}else{
	            		res.json(
	            		{
	                         state:true,
	                         token:"Bearer " + token,
	                         user:{
	                         	id:user._id,
	                         	user_name:user.user_name,
	                         	shop_name:user.shop_name,
	                         	shop_address:user.shop_address,
	                         	registration_no:user.registration_no,
	                         	phone_no:user.phone_no,
	                         	email:user.email

	                         }

	            		});
	            	}
                });
                
			}else{
              res.json({state:false,msg:"Password does not match"});
			}

		});
			

	});

});

router.get('/profile', verify.verifytoken, function(req, res) {
    
	jwt.verify(req.token, config.secret, function(err,data) {
		if (err) {
			throw err;
		}else{
			res.json({user:data.user});
		}
	})
       
    }
);



module.exports = router;


