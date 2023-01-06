import { ProductsTypeService } from './../service/ProductsTypeService';
import { Get, Route, Controller, Request, Post, Body} from "tsoa";
import * as response from "../responses";
import { ProductsService } from "../service/ProductsService"
import { UserService } from "../service/UserService";


@Route("products")
export default class ProductsController extends Controller {


    /**
   * Get all Products
   * @summary 
   */
    @Get("/all")
    public async getProducts(@Request() res: any,): Promise<any> {
        const data =await new ProductsService().getProductsAll()
        if(data.length > 0){
            res.send({status: "Success", message:"All data", data: data})
        }else{
            res.send({status: "Error", message:"No data found", data: []})
        }
    }

    /**
   * Create a new product
   * @summary 
   */
    @Post("/create")
    public async create(@Request() _req: any, @Body() res: any): Promise<any> {
        try{
            const { name, price, type, token } = _req.body
           
            if(!name)
                throw new Error(res.status(422).json(response.validation({ label: "Field [Name] is required." })))
            
            if(!price)
                throw new Error(res.status(422).json(response.validation({ label: "Field [Price] is required." })))

            if(!type)
                throw new Error(res.status(422).json(response.validation({ label: "Field [Type] is required." })))

            if(!token)
                throw new Error(res.status(422).json(response.validation({ label: "Field [Token] is required." })))

            if(!_req.file)
                throw new Error(res.status(422).json(response.validation({ label: "Field [Imagem] is required." })))
            
            const data = await new UserService().verifyAdmin(token)
            if(data) 
            {
                const resultType = await new ProductsTypeService().verifyType(type)
                if(resultType == false)
                    throw new Error(res.status(403).json(response.error("Could not find Product Type", res.statusCode)))            

                let url = await new ProductsService().uploadImage(_req.file,name)
                
                const result = await new ProductsService().create(name,price,type,url)
                res.status(200).send({status: "Success", message:"Create Product", data: result})
            }
            else throw new Error(res.status(401).json(response.error("User Not Authenticated", res.statusCode))) 
            
        }
        catch(e){}
    }


    /**
   * Show product by type
   * @summary A concise summary.
   */
    @Post("/byType")
    public async byType(@Request() _req: any, @Body() res: any): Promise<any> {
        try{
            const { token } = _req.body

            if(!token)
                throw new Error(res.status(422).json(response.validation({ label: "Field [Token] is required." })))
        
            const resultType = await new ProductsTypeService().verifyType(token)
            if(resultType == false)
                throw new Error(res.status(403).json(response.error("Could not find Product Type", res.statusCode)))            

            const result = await new ProductsService().queryByType(token)

            if(result == false)
                throw new Error(res.status(404).json(response.error("Could not find Products", res.statusCode)))   
                
            res.status(200).send({status: "Success", message:"Product By Type", data: result})
        }
        catch(e){}
    }

}
