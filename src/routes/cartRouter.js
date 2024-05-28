import { Router } from "express";
import * as controller from "../controllers/CartManager.js";

const router = Router();

router.get("/", controller.getCarts);

router.get("/:id", controller.getCartById);

router.post("/", controller.createCart);

router.put("/:id", controller.updateCart);

router.delete("/:id", controller.deleteCart);

router.post('/:cid/product/:pid', controller.addProductToCart);

export default router;

