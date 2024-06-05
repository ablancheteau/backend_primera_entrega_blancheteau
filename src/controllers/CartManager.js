import CartDaoMongoDB from '../daos/cart.dao.js';

const cartDao = new CartDaoMongoDB();

// Obtener todos los carritos
export const getCarts = async (req, res) => {
  try {
    const carts = await cartDao.getAll();
    res.json(carts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un carrito específico con detalles de producto
export const getCartById = async (req, res) => {
  try {
    const cart = await cartDao.getById(req.params.id)
      .populate('products.productId', 'name price description thumbnail');
    if (cart) {
      res.json(cart);
    } else {
      res.status(404).json({ error: "Carrito no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear un nuevo carrito
export const createCart = async (req, res) => {
  try {
    const newCart = req.body;
    const cart = await cartDao.create(newCart);
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un carrito
export const updateCart = async (req, res) => {
  try {
    const updatedCart = await cartDao.update(req.params.id, req.body);
    if (updatedCart) {
      res.json(updatedCart);
    } else {
      res.status(404).json({ error: "Carrito no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un carrito
export const deleteCart = async (req, res) => {
  try {
    const deletedCart = await cartDao.delete(req.params.id);
    if (deletedCart) {
      res.json({ message: "Carrito eliminado correctamente" });
    } else {
      res.status(404).json({ error: "Carrito no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Agregar un producto al carrito
export const addProductToCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    const updatedCart = await cartDao.addProduct(cid, pid, quantity || 1);
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un producto del carrito
export const removeProductFromCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const updatedCart = await cartDao.removeProduct(cid, pid);
    if (updatedCart) {
      res.json(updatedCart);
    } else {
      res.status(404).json({ error: "Producto no encontrado en el carrito" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar la cantidad de un producto en el carrito
export const updateCartProductQuantity = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    const updatedCart = await cartDao.updateProductQuantity(cid, pid, quantity);
    if (updatedProgram) {
      res.json(updatedCart);
    } else {
      res.status(404).json({ error: "Producto no encontrado en el carrito" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
