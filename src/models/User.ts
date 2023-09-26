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
  resetPasswordToken: {
    required: false,
    type: String,
  },
  passwordHint: {
    required: false,
    type: String,
    default: '',
  },
  autoStart: {
    required: false,
    type: Boolean,
    default: false,
  },
  sessionTime: {
    required: false,
    type: Number,
    default: 25 * 60,
  },
  breakTime: {
    required: false,
    type: Number,
    default: 5 * 60,
  },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
