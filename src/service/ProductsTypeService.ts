import { ProductsType } from "../models/Products"
import * as _crud from "../CloudFirestoreCRUD"
import { v4 as uuidv4 } from 'uuid';

export type ProductsTypeCreationParams = Pick<ProductsType, "name">

export class ProductsTypeService {
    public async create(name: string,): Promise<any> {
      const productType : ProductsType = { name: name, uid: uuidv4()}
      const result = await _crud.post({collection:"productsType", data: productType})
      return result
    }

    public async getProductsType(): Promise<ProductsType[]> {
      const result: any = await _crud.getAll({collection:"productsType"})
      let productsType: ProductsType[] = []
      if(result.status == "Success"){
        productsType = result.data
      }
      return productsType
    }

    public async verifyType(token : string): Promise<any> {
      const result: any = await _crud.get({collection:"productsType", token:token})

      if(result.status == "Success")
        return true
      else
        return false
    }
}