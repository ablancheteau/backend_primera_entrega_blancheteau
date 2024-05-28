import CartDaoMongoDB from '../daos/cart.dao.js';

const cartDao = new CartDaoMongoDB();

export const getCarts = async (req, res) => {
  try {
    const carts = await cartDao.getAll();
    res.json(carts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCartById = async (req, res) => {
  try {
    const cart = await cartDao.getById(req.params.id);
    if (cart) {
      res.json(cart);
    } else {
      res.status(404).json({ error: "Carrito no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createCart = async (req, res) => {
  try {
    const newCart = req.body;
    const cart = await cartDao.create(newCart);
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

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
