import { Products } from "../models/Products"
import * as _crud from "../CloudFirestoreCRUD"
import { v4 as uuidv4 } from 'uuid';
import { admin, Bucket} from "../fireabase"

export class ProductsService {
    public async create(name: string, preco: number, type: string, url: string): Promise<any> {
        const product : Products = { name: name, uid: uuidv4(), price: preco, type: type, urlImage:url}
        const result = await _crud.post({collection:"products", data: product})
        return result
    }

    public async getProductsAll(): Promise<Products[]> {
      const result: any = await _crud.getAll({collection:"products"})
      let productsType: Products[] = []
      if(result.status == "Success"){
        productsType = result.data
      }
      return productsType
    }



    public async verifyProduct(token : string): Promise<any> {
      const result: any = await _crud.get({collection:"products", token:token})

      if(result.status == "Success")
        return true
      else
        return false
    }

    public async queryByType(token : string): Promise<any> {
      const result: any = await _crud.getAllQuery({collection:"products",token:token, parameter: "type"})

      if(result.status == "Success")
        return result
      else
        return false
    }


    public async uploadImage(image: any, name: string): Promise<any> {
      const FileName = name + "_" + Date.now() +  "." + image.originalname.split(".").pop()
      const file = admin.storage().bucket().file(FileName)

      const steam = file.createWriteStream({
          metadata: {
              contentType: image.mimetype
          },
      })

      steam.on("error", () => {
          return "error"
      })

      steam.on("finish" , async () => {
          await file.makePublic() 
      }) 

      steam.end(image.buffer)

      return "https://storage.googleapis.com/" + Bucket + "/" + FileName 

    }
}