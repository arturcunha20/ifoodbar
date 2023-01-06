import * as _crud from "../CloudFirestoreCRUD"
import * as _OrdersModels from  "../models/Orders"


export class OrdersService {
    public async create(_data:any): Promise<any> {
        const Order : _OrdersModels.Orders = { uid: "0", datetime: ""+ new Date().toLocaleString(), price: _data.price, description: _data.description, state: 0, UserUid: _data.token };
        let result: any[] = [];
        let res;
        res = await _crud.post({collection:"orders", data: Order})
        result.push(res)
        await _data.products.forEach(async (orderProduct: any) =>{
            res = await _crud.post({collection:"orderProduct", data: {Orders_uID: result[0].data.uid, Products_uID: orderProduct.Products_uID, Quantity: orderProduct.Quantity}})
            result.push(res)
        })

        return result
    }

    public async getOrders(uid: string): Promise<any[]> {
        const result: any = await _crud.getAllQuery({collection:"orders", token:uid, parameter: "UserUid"})
        let orders: any[] = []
        
        if(result.status == "Success"){
            orders = result.data
        }
        return orders
    }

    public async getDetails(uid: string): Promise<any[]> {
        const result: any = await _crud.getAllQuery({collection:"orderProduct", token:uid, parameter: "Orders_uID"})
        let orders: any[] = [];
        for await (const res of result.data) {
            const product = await _crud.get({collection:"products", token: res.Products_uID})
            res.Products_uID = product.data.name
            orders.push(res)
          }

        return orders
    }

}