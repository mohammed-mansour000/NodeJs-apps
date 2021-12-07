const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail , 'Please enter a valid email']
    }, 
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Password should be 6 characters']
    }
});

//fire pre func before doc been saved in db
userSchema.pre('save', async function (next){
    console.log("before saving")
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    //go to next middleware
    next();
});

//fire post func after doc been saved in db
userSchema.post('save', function (doc, next){
    console.log("after saving")
    //go to next middleware
    next();
});

//create a static method to login user
userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email });
    if(user) {
        const auth = await bcrypt.compare(password, user.password);
        if(auth){
            return user;
        }
        throw Error('incorrect password');
    }
    throw Error("email doesn't exist");
}

const User = mongoose.model('user', userSchema);
module.exports = User;