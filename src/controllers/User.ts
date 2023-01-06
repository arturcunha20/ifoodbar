import { Get, Post, Route, Controller, Body,  Query,  Request,  Hidden, Delete } from "tsoa";
import * as response from "../responses";
import { auth, admin } from "../fireabase"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { UserService } from "../service/UserService";
import { ProductsService } from "../service/ProductsService"

@Route("user")
export default class UserController extends Controller {
  
  @Get("/")
  /**
   * Get a user
   * @summary 
   */
  public async getUser(@Request() res: any, @Query() @Hidden() token?: string): Promise<any> {
    try{
      if (!token)
        throw new Error(res.status(422).json(response.validation({ label: "Field [uid] is required." })))

      const data = await new UserService().getUser(token)

      if(data) res.status(200).json(response.success("User Data", [data], res.statusCode));
      else res.status(403).json(response.success("Error", [], res.statuscode))
      
    }
    catch(e){}
  }

  /**
   * Login a user
   *
   * @summary
   */
  @Post("/login")
  public async LogIn(@Request() req: any, @Body() res: any): Promise<any> {
    const { email, password } = req.body;
    const expiresIn = 60 * 60 * 24 * 2 * 1000; //segundos * minutos * horas * dias * ms
    try{    
      if (!email)
        throw new Error(res.status(422).json(response.validation({ label: "Field [email] is required." })))
  
      if (!password)
        throw new Error(res.status(422).json(response.validation({ type: "Field [password] is required." })));
        
      await signInWithEmailAndPassword(auth, email, password)
        .then(async ({user}) =>  {
          await user.getIdToken()
          .then(async (idToken) => {
            await admin.auth().createSessionCookie(idToken, { expiresIn })
            .then(async (sessionCookie : any) => {
              const options = { maxAge: expiresIn , httpOnly: true }
              const userGet = await new UserService().getUser(user.uid)
              res.cookie("session", sessionCookie, options)
              res.status(200).json(response.success("Session Created", [ sessionCookie, userGet ], res.statusCode));
            },
            (error: any) => {
              res.status(403).json(response.error(error.message, res.statusCode)) 
            })
          })
          .catch(error => { res.status(403).json(response.error(error.message, res.statusCode)) })
        })
        .catch(error => { res.status(403).json(response.error(error.message, res.statusCode)) })
        .catch(error => { res.status(403).json(response.error(error.message, res.statusCode))});
    }catch(e){ }
  }

  /**
   * Create a user
   * 
   * @summary y.
   */
  @Post("/signin")
  public async signIn(@Request() req: any, @Body() res: any): Promise<any> {
    const { email, password, name } = req.body;
    try{
      if (!email)
        throw new Error(res.status(422).json(response.validation({ label: "Field [email] is required." })))
  
      if (!password)
        throw new Error(res.status(422).json(response.validation({ type: "Field [password] is required." })))
    
      if (!name)
        throw new Error(res.status(422).json(response.validation({ type: "Field [name] is required." })))

      if(req.body.type == undefined) req.body.type = "1"
      else {
        const resultType = await new UserService().verifyType(req.body.type)

        if(resultType == false)
        throw new Error(res.status(403).json(response.error("Could not find User Type", res.statusCode)))   
      }

      await createUserWithEmailAndPassword(auth, email, password)
      .then(async (usercredentials) => {
        req.body.uid = usercredentials.user.uid;
        const result = await new UserService().create(req.body)

        if(result.status == 'Success'){
          res.status(200).send({status: "Success", message:"Account created successfully.", data: result.data})
        }
        else{
          res.status(403).json(response.error("Some error occurred while creating the user", res.statusCode))
        }

      })
      .catch(error => { res.status(403).json(response.error(error.message, res.statusCode)) })
      
    }
    catch(e){}
  }

  
   /**
   * Logout a user
   * 
   * @summary 
   */
   @Post("/signOut")
   public async signOut(@Request() req: any, @Body() res: any): Promise<any>{
    res.clearCookie("session");
    console.log(req.body);
    auth.signOut().catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      return errorCode + errorMessage
    });
  
    return "Sucesso"
   }

  /**
   * Add a product to fuser favorites
   * @summary A concise summary.
   */
  @Post("/addFavorites")
  public async addFavorites(@Request() req: any, @Body() res: any): Promise<any>{
      try{
        const { token, uidProduct } = req.body;
        if (!token)
          throw new Error(res.status(422).json(response.validation({ label: "Field [uid] is required." })))
        
        if (!uidProduct)
          throw new Error(res.status(422).json(response.validation({ label: "Field [uidProduct] is required." })))

        const resultType = await new ProductsService().verifyProduct(uidProduct)
        if(resultType == false)
            throw new Error(res.status(403).json(response.error("Could not find Product", res.statusCode)))

        const result = await new UserService().addFavorites({uidProduct: uidProduct, uidUser: token})
        if(result.status == 'Success'){
          res.status(200).send({status: "Success", message:"Product added to favorites successfully.", data: result.data})
        }
        else{
          res.status(403).json(response.error("An error occurred while adding the product to favorites", res.statusCode))
        }
      }
      catch(err){}
      
  }

  /**
   * Delete a product from user favorites
   * @summary 
   */
  @Delete("/delFavorites")
  public async delFavorites(@Request() req: any, @Body() res: any): Promise<any>{
      try{
        const { token, uidFavorites } = req.body;
        if (!token)
          throw new Error(res.status(422).json(response.validation({ label: "Field [uid] is required." })))
        
        if (!uidFavorites)
          throw new Error(res.status(422).json(response.validation({ label: "Field [uidFavorites] is required." })))

        const result = await new UserService().delFavorite(uidFavorites)
        res.send(result)
      }
      catch(err){}
      
  }

   /**
   * Get all the favorites from a user
   * @summary 
   */
  @Get("/allFavorites")
    public async getAllFavorites(@Request() res: any, @Query() @Hidden() token?: string): Promise<any> {
      try{
        if (!token)
          throw new Error(res.status(422).json(response.validation({ label: "Field [uid] is required." })))
  
          const data = await new UserService().getFavorite(token)
          if(data.length > 0){
              res.send({status: "Success", message:"All data", data: data})
          }else{
              res.send({status: "Error", message:"No data found", data: []})
          }
      }
      catch(e){}
    }
}

