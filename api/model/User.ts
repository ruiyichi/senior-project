import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	profilePicture: {
		type: String,
		default: 'default.png'
	},
	refreshToken: String,
	experience: {
		type: Number,
		default: 0,
	},
});

export default mongoose.model('User', userSchema);