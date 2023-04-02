import mongoose from 'mongoose';

const DaySchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  totalTime: {
    type: Number,
    default: 0,
  },
  date: {
    type: String,
  },
});

export default mongoose.models.Day || mongoose.model('Day', DaySchema);
