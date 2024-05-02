const express = require('express');
const router = express.Router();
const CartManager = require('../CartManager');

const cartManager = new CartManager('carrito.json');

router.post('/', async (req, res) => {
  try {
    const newCart = req.body;
    await cartManager.createCart(newCart);
    res.status(201).json({ message: "Carrito creado correctamente" });
  } catch (error) {
    console.error("Error al crear carrito:", error);
    res.status(500).json({ error: "Error al crear carrito" });
  }
});

router.get('/:cid', async (req, res) => {
  try {
    const cartId = parseInt(req.params.cid);
    const cart = await cartManager.getCartById(cartId);
    if (cart) {
      res.json(cart);
    } else {
      res.status(404).json({ error: "Carrito no encontrado" });
    }
  } catch (error) {
    console.error("Error al obtener carrito por ID:", error);
    res.status(500).json({ error: "Error al obtener carrito por ID" });
  }
});

router.post('/:cid/product/:pid', async (req, res) => {
  try {
    const cartId = parseInt(req.params.cid);
    const productId = parseInt(req.params.pid);
    const quantity = req.body.quantity || 1; // Cantidad por defecto es 1
    await cartManager.addProductToCart(cartId, productId, quantity);
    res.json({ message: "Producto agregado al carrito correctamente" });
  } catch (error) {
    console.error("Error al agregar producto al carrito:", error);
    res.status(500).json({ error: "Error al agregar producto al carrito" });
  }
});

module.exports = router;
