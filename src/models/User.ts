import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
	email: {
		required: true,
		type: String,
	},
	username: {
		required: true,
		type: String,
		default: '',
	},
	password: {
		required: false,
		type: String,
	},
	totalTime: {
		default: 0,
		type: Number,
	},
	resetPasswordToken: {
		required: false,
		type: String,
	},
	passwordHint: {
		type: String,
		default: '',
	},
	autoStart: {
		type: Boolean,
		default: false,
	},
	sessionTime: {
		type: Number,
		default: 25 * 60 * 1000,
	},
	breakTime: {
		type: Number,
		default: 5 * 60 * 1000,
	},
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
