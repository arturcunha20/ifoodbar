import { Router } from "express";
import { CheckToken } from "../Auth/auth"; 
import OrdersController from "../controllers/orders"

const router = Router();


router.route("/orders/create")
  .post(CheckToken, async(req,res) => {
    const controller = new OrdersController();
    const response : any = await controller.addNewOrder(req,res);
    return res.send(response);
  })

router.route("/orders/all")
  .get(CheckToken, async(req,res) => {
    const controller = new OrdersController();
    const response : any = await controller.getOrders(res, req.body.token);
    return res.send(response);
  })


router.route("/orders/details")
  .post(CheckToken, async(req,res) => {
    const controller = new OrdersController();
    const response : any = await controller.getOrderDetails(req, res);
    return res.send(response);
  })

export default router;