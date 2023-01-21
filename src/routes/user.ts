import { Router } from "express";
import UserController from "../controllers/User"
import { CheckToken } from "../Auth/auth"; 

const router = Router();

router.route("/user")
  .get(CheckToken, async (req, res) => {
    const controller = new UserController();
    const response : any = await controller.getUser(res, req.body.token);
    return res.send(response);
  });

router.route("/user/update")
  .put(CheckToken, async (req, res) => {
    const controller = new UserController();
    const response : any = await controller.updateUser(req, res) ;
    return res.send(response);
  });

  router.route("/user/login")
  .post(async (_req, res) => {
    const controller = new UserController();
    const response : any = await controller.LogIn(_req, res);
    return res.send(response);
  });

  
  router.route("/user/changeDevice")
  .post(CheckToken,async (_req, res) => {
    const controller = new UserController();
    const response : any = await controller.deviceChange(_req, res);
    return res.send(response);
  });

router.route("/user/signin")
  .post(async (_req, res) => {
    const controller = new UserController();
    const response : any = await controller.signIn(_req, res) ;
    return res.send(response);
  });

router.route("/user/signOut")
  .post(CheckToken, async (_req, res) => {
    const controller = new UserController();
    const response : any = await controller.signOut(_req, res) ;
    return res.send(response);
  });

router.route("/user/addFavorites")
  .post(CheckToken, async (_req, res) => {
    const controller = new UserController();
    const response : any = await controller.addFavorites(_req, res);
    return res.send(response);
  });

router.route("/user/delFavorites")
  .delete(CheckToken, async (_req, res) => {
    const controller = new UserController();
    const response : any = await controller.delFavorites(_req, res);
    return res.send(response);
  });

router.route("/user/allFavorites")
  .get(CheckToken, async (_req, res) => {
    const controller = new UserController();
    const response : any = await controller.getAllFavorites(res, _req.body.token);
    return res.send(response);
  });

export default router;