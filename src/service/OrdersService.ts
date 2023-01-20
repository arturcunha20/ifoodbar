import * as _crud from "../CloudFirestoreCRUD"
import * as _OrdersModels from  "../models/Orders"
import axios from 'axios';

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

    public async getOrdersUser(uid: string): Promise<any[]> {
        const result: any = await _crud.getAllQuery({collection:"orders", token:uid, parameter: "UserUid"})
        let orders: any[] = []
        
        if(result.status == "Success") orders = result.data
        return orders
    }


    public async getOrdersById(uid: String): Promise<any[]> {
        const result: any = await _crud.getAllQuery({collection:"orders", token:uid, parameter: "uid"})
        let orders: any[] = []
        
        if(result.status == "Success") orders = result.data
        return orders
    }

    public async verifyOrder(uid: string): Promise<any> {
        const result: any = await _crud.get({collection:"orders", token:uid})
        
        if(result.status == "Success") return true
        return false
    }

    public async updateState(_uid: string, order: String): Promise<any> {
        const result: any = await this.getOrdersById(order)
        result[0].state = 1

        const resultUpdate : any = await _crud.update({ collection: "orders", token: order, data:result[0] })
        if(resultUpdate) return result[0]
        return false
    }

    public async getOrders(): Promise<any[]> {
        const result: any = await _crud.getAll({collection:"orders"})
        let orders: any[] = []
    
        if(result.status == "Success") orders = result.data
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

    public async notification(device: any , order: any ): Promise<any>
    {
        const headers = {
            'Authorization': 'Bearer AAAA1OK4ayk:APA91bH1qmqQoC3KtS18HJtUjTxbq1uOzFIyB_5SZBQvuy3xqtdczJhtKu1SEXXtvWDdj8RsJjHuI3ebrICGoTOtmP8Jz_QSY8Ikjz-uJf28MWu-t0Ta0lm4HErziiROQ_Sag4M_Owlj',
            'Content-Type': 'application/json'
          };

        const data = {
            to: device.tokendevice,
            collapse_key: "type_a",
            notification : {
                body : "Pedido N" + order.description + " esta pronto",
                title: "IFoodBar"
            }
          };

        await axios.post('https://fcm.googleapis.com/fcm/send', data, { headers: headers })
        .then(response => {
            console.log(response.data);
            return true
        })
        .catch(error => {
            console.log(error);
            return false
        });
    }
}