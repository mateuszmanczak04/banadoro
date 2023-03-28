import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
