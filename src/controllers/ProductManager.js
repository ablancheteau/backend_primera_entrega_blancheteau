import ProductDaoMongoDB from '../daos/mongodb/product.dao.js';

const productDao = new ProductDaoMongoDB();

export const getAllProducts = async (req, res) => {
  const { limit = 10, page = 1, sort, category, priceMin, priceMax, search } = req.query;

  const queryOptions = {};
  if (category) queryOptions.category = category;
  if (search) queryOptions.name = { $regex: search, $options: "i" };
  if (priceMin) queryOptions.price = { ...queryOptions.price, $gte: parseInt(priceMin) };
  if (priceMax) queryOptions.price = { ...queryOptions.price, $lte: parseInt(priceMax) };

  try {
      const products = await ProductModel.find(queryOptions)
          .sort(sort ? { price: (sort === 'desc' ? -1 : 1) } : {})
          .skip((page - 1) * parseInt(limit))
          .limit(parseInt(limit))
          .exec();

      const totalProducts = await ProductModel.countDocuments(queryOptions);
      const totalPages = Math.ceil(totalProducts / limit);

      res.json({
          status: 'success',
          payload: products,
          totalPages,
          page,
          prevPage: page > 1 ? page - 1 : null,
          nextPage: page < totalPages ? page + 1 : null,
          hasPrevPage: page > 1,
          hasNextPreparePage: page < totalPages
      });
  } catch (error) {
      res.status(500).json({ status: 'error', message: 'Error fetching products' });
  }
};


export const getProductById = async (req, res) => {
  try {
    const product = await productDao.getById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: "Producto no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const newProduct = req.body;
    const product = await productDao.create(newProduct);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await productDao.update(req.params.id, req.body);
    if (updatedProduct) {
      res.json(updatedProduct);
    } else {
      res.status(404).json({ error: "Producto no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await productDao.delete(req.params.id);
    if (deletedProduct) {
      res.json({ message: "Producto eliminado correctamente" });
    } else {
      res.status(404).json({ error: "Producto no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};