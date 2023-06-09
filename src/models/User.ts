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
    required: true,
    default: 0,
    type: Number,
  },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
