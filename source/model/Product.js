import { model, Schema } from 'mongoose'

const ProductSchema = new Schema(
  {
    name:
    {
      type: String,
      required: [true, 'El nombre es requerido']
    },
    description:
    {
      type: String,
      required: [true, 'La descripción es requerida']
    },
    imageUrl:
    {
      type: String,
      required: [true, 'La descripción es requerida']
    },
    price:
    {
      type: String,
      required: [true, 'El precio es requerido']
    }
  },
  {
    timestamps: true
  }
)

export default model('Product', ProductSchema)
