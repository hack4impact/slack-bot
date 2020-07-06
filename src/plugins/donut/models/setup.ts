import mongoose from 'mongoose';
import type { Document } from 'mongoose';

const donutSetupSchema = new mongoose.Schema({
  viewId: { type: String },
  weekInterval: { type: Number, default: 2 },
  groupCount: { type: Number, default: 1 },
});

interface IDonutSetup extends Document {
  viewId?: string,
  weekInterval: number,
  groupCount: number,
}

const DonutSetup = mongoose.model<IDonutSetup>('DonutSetup', donutSetupSchema);

export default DonutSetup;
export type { IDonutSetup };
