import { UserService } from "../service/UserService";
import { Body, Post, Route, Request, Get, Query, Hidden, Tags, SuccessResponse,Response, Put  } from "tsoa";
import * as response from "../responses";
import { OrdersService } from "../service/OrdersService"

@Route("addOrder")
@Tags('Orders')
export default class OrdersController {
  /**
   * Create a new order
   * @summary
   * 
   */
    @Post("/create")
    @SuccessResponse ('200', 'Create Order') 
    @Response ('422', 'Missing Field')
    public async addNewOrder(@Request() req: any, @Body() res: any): Promise<any> {
        try {
            const { token, products, price, description } = req.body
            if (!token)
                throw new Error(res.status(422).json(response.validation({ label: "Field [token] is required." })))
        
            if(!products)
                throw new Error(res.status(422).json(response.validation({ label: "Field [Products] is required." })))
            
            if(typeof products != "object")
                throw new Error(res.status(422).json(response.validation({ label: "Field [Products] is not correct." })))
            
            if(!price)
                throw new Error(res.status(422).json(response.validation({ label: "Field [price] is required." })))
            
            if(typeof price != "number" || price < 0)
                throw new Error(res.status(422).json(response.validation({ label: "Field [price] is not correct." })))
        
            if(!description)
                throw new Error(res.status(422).json(response.validation({ label: "Field [description] is required." })))
            
            const result = await new OrdersService().create({price: price, description: description, products: products, token: token});

            res.status(200).send({status: "Success", message:"Create Order", data: result})
        } catch (error) {
            
        }
    }

    /**
    * Get all orders from a user
    * @summary 
    */
    @Post("/allUser")
    @SuccessResponse ('200', 'All Orders') 
    @Response ('422', 'Missing Field')
    @Response ('403', 'Error')
    public async getOrdersUser(@Request() res: any, @Query() @Hidden() token?: string): Promise<any> {
        try{
            if (!token)
              throw new Error(res.status(422).json(response.validation({ label: "Field [uid] is required." })))
      
            const data = await new OrdersService().getOrdersUser(token)
            if(data){
              res.status(200).send({status: "Success", message:"All Orders by User", data: data})
            }else{
              res.status(403).json(response.success("Error", [], res.statuscode))
            }
          }
          catch(e){}
    }


    /**
   * Get all orders
   * @summary 
   */
        @Get("/all")
        @SuccessResponse ('200', 'All Orders') 
        @Response ('422', 'Missing Field')
        @Response ('403', 'Error')
        public async getOrders(@Request() res: any): Promise<any> {
            try{
        
                const data = await new OrdersService().getOrders()
                if(data){
                  res.status(200).send({status: "Success", message:"All Orders", data: data})
                }else{
                  res.status(403).json(response.success("Error", [], res.statuscode))
                }
              }
              catch(e){}
        }
    

    /**
   * Get details from order
   * @summary
   */
    @Post("/details")
    @SuccessResponse ('200', 'Orders Details') 
    @Response ('422', 'Missing Field')
    @Response ('403', 'Error')
    public async getOrderDetails(@Request() req: any, @Body() res: any): Promise<any> {
        try{
            const { OrderUID } = req.body
            if (!OrderUID)
              throw new Error(res.status(422).json(response.validation({ label: "Field [OrderUID] is required." })))
      
            const data = await new OrdersService().getDetails(OrderUID)
            if(data){
              res.status(200).send({status: "Success", message:"Orders Details", data: data})
            }else{
              res.status(403).json(response.success("Error", [], res.statuscode))
            }
          }
          catch(e){}
    }

    /**
   * Change Order State
   * @summary
   */
    @Put("/stateChange")
    @SuccessResponse ('200', 'Orders Details') 
    @Response ('422', 'Missing Field')
    @Response ('403', 'Error')
    public async changeStateOrder(@Request() req: any, @Body() res: any): Promise<any> {
        try{
            const { token, orderUid } = req.body
            if (!token)
              throw new Error(res.status(422).json(response.validation({ label: "Field [Token] is required." })))

            if (!orderUid)
              throw new Error(res.status(422).json(response.validation({ label: "Field [orderUid] is required." })))
              

            const verify = await new OrdersService().verifyOrder(orderUid)
            if(verify)
            {
              const data = await new UserService().verifyAdmin(token)
            
              if(data){
                const changeState = await new OrdersService().updateState(token,orderUid)

                if(changeState)
                {
                    var device = await new UserService().getDevice(changeState.UserUid)

                    if(device)
                    {
                        const resultNotification = await new OrdersService().notification(device,changeState)
                        res.status(200).send({status: "Success", message:"BOAS", data: resultNotification})
                    }
                }
              }
              else
              {
                res.status(403).json(response.error("Error User Nao é Admin", res.statuscode))
              }
            }
            else
            {
              res.status(403).json(response.error("Error Order Nao Existe", res.statuscode))
            }

          }
          catch(e){}
    }

}
