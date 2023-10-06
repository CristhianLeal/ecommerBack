import { isValidObjectId } from 'mongoose'
import Product from '../model/Product.js'
import jwt from 'jsonwebtoken'

export const getProducts = async (req, res) => {
  console.log('getProducts')
  try {
    const products = await Product.find({})
    const claveToken = process.env.CLAVE
    const token = jwt.sign({ products }, claveToken, { expiresIn: '1h' })
    if (products.length > 0) {
      return res.status(200).json({
        message: 'Productos retornados con éxito',
        products,
        token
      })
    } else {
      res.status(200).json({
        message: 'No hay productos',
        data: [],
        token
      })
    }
  } catch (error) {
    return res.status(500).json({
      message: 'Error al obtener productos',
      error: error.message
    })
  }
}

export const getProduct = async (req, res) => {
  const { id } = req.params
  if (!isValidObjectId(id)) {
    return res.status(400).json({
      message: 'El id del producto no es válido'
    })
  }
  const product = await Product.findById(id)
  if (!product) {
    return res.status(404).json({
      message: 'producto no encontrado'
    })
  }
  res.status(200).json({
    message: `Obtuviste un producto llamado ${product.name}`,
    product
  })
}

export const createProduct = async (req, res) => {
  const { name, description, imageUrl, price } = req.body
  const existName = await Product.findOne({ name })
  if (existName) {
    res.status(206).send('Este nombre ya esta en uso')
  } else {
    const product = await Product({ name, description, imageUrl, price })
    try {
      await product.save()
      res.status(201).json({
        message: `Producto ${name} creado`,
        product: product.name
      })
    } catch (error) {
      res.status(500).json({
        message: 'No se pudo crear el producto',
        fields: {
          name: error.errors?.name?.message,
          description: error.errors?.description?.message,
          imageUrl: error.errors?.imageUrl?.message,
          price: error.errors?.price?.message
        }
      })
    }
  }
}

export const deleteProduct = async (req, res) => {
  const { id } = req.params

  if (!isValidObjectId(id)) {
    return res.status(400).json({
      message: 'El id del producto no es valido'
    })
  }

  const product = await Product.findByIdAndDelete(id)
  if (!product) {
    return res.status(404).json({
      message: 'Producto no encontrado'
    })
  }
  res.status(200).json({
    message: `El producto con el nombre '${product?.name}' fue eliminado`
  })
}

export const editProduct = async (req, res) => {
  const { id } = req.params
  const { name, description, imageUrl, price } = req.body
  if (!isValidObjectId(id)) {
    return res.status(404).json({
      message: 'Producto: no es valido para edición'
    })
  }
  const productById = await Product.findById(id)
  if (!productById) {
    return res.status(404).json({
      message: 'Producto: no existente para edición'
    })
  }

  const productByName = await Product.findOne({ name })
  if (productByName && productById.name !== name) {
    return res.status(400).json({
      message: 'El nombre del producto ya existe'
    })
  }

  try {
    await Product.findByIdAndUpdate({ _id: id }, { name, description, imageUrl, price })
    res.status(201).json({
      message: `Producto ${name} editado`
    })
  } catch (error) {
    res.status(400).json({
      message: 'Ha ocurrido un error',
      fields: {
        name: error.errors?.name?.message,
        description: error.errors?.description?.message,
        imageUrl: error.errors?.imageUrl?.message,
        price: error.errors?.price?.message
      }
    })
  }
}
