import mongoose from 'mongoose';

const donutSetupSchema = new mongoose.Schema({
  viewId: { type: String },
  weekInterval: { type: Number, default: 2 },
  groupCount: { type: Number, default: 1 },
});

const DonutSetup = mongoose.model('DonutSetup', donutSetupSchema);

export default DonutSetup;