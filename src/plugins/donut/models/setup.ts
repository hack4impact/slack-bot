import mongoose from 'mongoose';
import type { Document } from 'mongoose';

const donutSetupSchema = new mongoose.Schema({
  weekInterval: { type: Number, default: 2 },
  groups: { type: [{ type: String }], default: [] },
});

interface IDonutSetup extends Document {
  weekInterval: number,
  groups: string[],
}

const DonutSetup = mongoose.model<IDonutSetup>('DonutSetup', donutSetupSchema);

export default DonutSetup;
export type { IDonutSetup };
