import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
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
  _id: {
    type: String,
    required: true,
  },
});

export default mongoose.models.Task || mongoose.model('Task', TaskSchema);
