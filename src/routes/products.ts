import { Router } from "express";
import ProdutsController from "../controllers/products"
import { CheckToken } from "../Auth/auth"; 
import { upload } from "../fireabase"

const router = Router();

router.route("/products/all")
  .get(async(_req,res) => {
    const controller = new ProdutsController();
    const response : any = await controller.getProducts(res);
    return res.send(response);
  })

router.route("/products/create")
  .post(upload.single('imagem') , CheckToken, async(req,res) => {
    const controller = new ProdutsController();
    const response : any = await controller.create(req,res);
    return res.send(response);
  })

  router.route("/products/byType")
  .post(async(req,res) => {
    const controller = new ProdutsController();
    const response : any = await controller.byType(req,res);
    return res.send(response);
  })


export default router;