import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
	id: {
		// "id" is an id generated on the client
		// which is later sent to the backend to allow
		// offline functionalities
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
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
	},
});

export default mongoose.models.Task || mongoose.model('Task', TaskSchema);
