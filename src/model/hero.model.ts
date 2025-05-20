import mongoose, { Document, Schema } from 'mongoose'

const heroSchema = new Schema(
  {
    userId: { type: String, require: true },
    name: { type: String, require: true },
    gender: { type: String, enum: ['male', 'female'], require: true },
    mail: { type: String, require: true, unique: true },
    age: { type: Number, require: true },
    address: { type: String, require: true },
    tags: { type: [String], require: true, default: [] }
  },
  {
    versionKey: false,
    strict: true,
    timestamps: true
  }
)

heroSchema.index({ mail: 1 })

export const Hero = mongoose.model('Hero', heroSchema)

export interface IHeroModel extends Document {
  name: string
  gender: string
  mail: string
  age: number
  address: string
  userId: string
  tags: string[]
}
