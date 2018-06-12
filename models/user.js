const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const schema = mongoose.Schema;

const userSchema = new schema({

	user_name:{type:String,required:true},
	shop_name:{type:String,required:true},
	shop_address:{type:String,required:true},
	registration_no:{type:String,required:true},
	phone_no:{type:String,required:true},
	email:{type:String,required:true},
	password:{type:String,required:true}
});

const User = module.exports = mongoose.model("User",userSchema);

module.exports.saveUser = function (newUser,callback){

	bcrypt.genSalt(10, function(err, salt) {
		bcrypt.hash(newUser.password, salt, function(err, hash) {
			newUser.password = hash;

			if (err) throw err;
			newUser.save(callback);  //database ekata attataama data tika danawa
		});
	});
};

module.exports.findByEmail = function(email,callback) {
	const query = {email:email};
	User.findOne(query,callback);

};

module.exports.passwordCheck = function (plainpassword,hash,callback) {
	bcrypt.compare(plainpassword, hash, function(err, res) {
		if(err) throw err;

		if (res) {
			callback(null,res);
		}
	});
};

