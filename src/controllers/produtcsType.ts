import { Post, Route, Controller, Request, Body, Get } from "tsoa";
import { ProductsTypeService }  from "../service/ProductsTypeService"
import { UserService } from "../service/UserService";
import * as response from "../responses";

@Route("productsType")
export default class ProdutsTypeController extends Controller {
    /**
   * Create a type of products
   * @summary A concise summary.
   */
    @Post("/create")
    public async create(@Request() req: any, @Body() res: any): Promise<any> {
        try{
            var { name,token } = req.body;
            if(!name)
                throw new Error(res.status(422).json(response.validation({ label: "Field [name] is required." })))

            if(!token)
                throw new Error(res.status(422).json(response.validation({ label: "Field [Token] is required." })))
    
            const data = await new UserService().verifyAdmin(token)

            if(data) 
            {
                const result = await new ProductsTypeService().create(name)

                if(result) res.status(200).send({status: "Success", message:"Product Type created", data: result})
                else res.status(403).json(response.success("Error", [], res.statuscode))
            }
            else throw new Error(res.status(401).json(response.error("User Not Authenticated", res.statusCode))) 
        }
        catch(e: any){
            res.status(403).json(response.error(e,e)) 
        }
    }

    /**
   * Get all types of products
   * @summary A concise summary.
   */
    @Get("/all")
    public async getAll(@Request() res: any ): Promise<any> {
        const data =await new ProductsTypeService().getProductsType()
        if(data.length > 0){
            res.send({status: "Success", message:"All data", data: data})
        }else{
            res.send({status: "Error", message:"No data found", data: []})
        }
    }
}
