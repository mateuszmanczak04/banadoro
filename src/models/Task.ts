import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
	id: {
		unique: true,
		required: true,
		type: String,
	},
	title: {
		required: true,
		type: String,
	},
	checked: {
		type: Boolean,
		required: true,
		default: false,
	},
	authorEmail: {
		type: String,
		required: true,
	},
});

export default mongoose.models.Task || mongoose.model('Task', TaskSchema);
