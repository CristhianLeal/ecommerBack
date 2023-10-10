import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany()
    if (!products || products.length === 0) {
      return res.status(200).json({ message: 'No hay productos' })
    }
    return res.status(200).json({ products })
  } catch (error) {
    console.error('Error fetching products:', error)
    return res.status(500).json({ message: 'Server error' })
  }
}

export const getProduct = async (req, res) => {
  const { id } = req.params
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: parseInt(id, 10)
      }
    })
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' })
    }
    return res.status(200).json({ product })
  } catch (error) {
    console.error('Error fetching product by ID:', error)
    return res.status(500).json({ message: 'Server error' })
  }
}

export const createProduct = async (req, res) => {
  const { name, description, imageUrl, price } = req.body
  try {
    const existingProduct = await prisma.product.findUnique({ where: { name } })
    if (existingProduct) {
      return res.status(206).send('Este nombre ya está en uso')
    }
    const priceFloat = parseFloat(price)
    const createdProduct = await prisma.product.create({
      data: {
        name,
        description,
        imageUrl,
        price: priceFloat
      }
    })
    res.status(201).json({
      message: `Producto ${name} creado`,
      product: createdProduct
    })
  } catch (error) {
    console.error('Error creating product:', error)
    res.status(500).json({
      message: 'No se pudo crear el producto',
      error: error.message
    })
  }
}

export const deleteProduct = async (req, res) => {
  const { id } = req.params
  try {
    const parsedId = parseInt(id, 10)
    const product = await prisma.product.delete({
      where: {
        id: parsedId
      }
    })
    if (!product) {
      return res.status(404).json({
        message: 'Producto no encontrado'
      })
    }
    res.status(200).json({
      message: `El producto con el nombre '${product.name}' fue eliminado`
    })
  } catch (error) {
    console.error('Error deleting product:', error)
    res.status(500).json({
      message: 'No se pudo eliminar el producto',
      error: error.message
    })
  }
}

export const editProduct = async (req, res) => {
  const { id } = req.params
  const { name, description, imageUrl, price } = req.body
  try {
    const existingProduct = await prisma.product.findUnique({ where: { id: parseInt(id, 10) } })
    if (!existingProduct) {
      return res.status(206).json({
        message: 'Producto: no existente para edición'
      })
    }
    const productByName = await prisma.product.findFirst({ where: { name } })
    if (productByName && existingProduct.name !== name) {
      console.log('pb', productByName)
      console.log('en', existingProduct.name)
      console.log('name', name)
      return res.status(206).json({
        message: 'El nombre del producto ya existe'
      })
    }
    const priceFloat = parseFloat(price)
    await prisma.product.update({
      where: { id: parseInt(id, 10) },
      data: {
        name,
        description,
        imageUrl,
        price: priceFloat
      }
    })
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

export const log = (req, res) => {
  try {
    const claveToken = process.env.TOKEN
    const token = jwt.sign({}, claveToken, { expiresIn: '1h' })
    if (token !== undefined) {
      return res.status(200).json({
        message: 'token retornado con éxito',
        token
      })
    } else {
      res.status(404).json({
        message: 'No se pudo generar el token'
      })
    }
  } catch (error) {
    return res.status(500).json({
      message: 'Error al generar el token',
      error: error.message
    })
  }
}

export const getByFilter = async (req, res) => {
  const { searchQuery } = req.body
  const searchQueryLowercased = searchQuery.toLowerCase()
  try {
    const products = await prisma.product.findMany({
      where: {
        OR: [
          { name: { contains: searchQueryLowercased } },
          { description: { contains: searchQueryLowercased } }
        ]
      }
    })
    if (products.length > 0) {
      res.status(200).json({
        message: `Productos encontrados con el término ${searchQuery}`,
        data: products
      })
    } else {
      return res.status(404).json({
        message: 'No se encontraron productos'
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error al buscar productos.' })
  }
}
