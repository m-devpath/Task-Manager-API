import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        minlength: [2, 'Name must be at lease 2 characters'],
    },

    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        unique: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },

    password: {
        type: String,
        required: true,
        minlength: [6, 'Password must be at lease 6 and above '],
        select: false,
    },

},  {timestamps: true});


userSchema.pre('save', async function(next) {
    
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password ,10);
    next();

});

userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;




