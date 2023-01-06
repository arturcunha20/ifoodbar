import { Router } from "express";
import ProdutsTypeController from "../controllers/produtcsType"
import { CheckToken } from "../Auth/auth"; 

const router = Router();

router.route("/productsType/create")
  .post(CheckToken, async(req,res) => {
    const controller = new ProdutsTypeController();
    const response : any = await controller.create(req,res);
    return res.send(response);
    })

router.route("/productsType/all")
  .get( async (_req, res) => {
    const controller = new ProdutsTypeController();
    const response: any = await controller.getAll(res)
    return res.send(response);
  });


export default router;