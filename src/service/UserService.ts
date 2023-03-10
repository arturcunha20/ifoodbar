import { UserModel,DeviceToken } from "../models/User"
import { Favorites } from "../models/Favorites"
import * as _crud from "../CloudFirestoreCRUD"

export type User = UserModel
export type UserCreationParams = Pick<UserModel, "name">
export type FavoritesCreationParams = Pick<Favorites, "uidUser" | "uidProduct">

export class UserService {
  public async create(data: any): Promise<any> {
      const user : UserModel = { name: data.name, uid: data.uid, email: data.email, password: data.password, userType: data.type }
      const result = await _crud.post_user({collection:"user", data: user, uid: true},data.uid)
      return result
  }

  public async verifyType(token : string): Promise<any> {
    const result: any = await _crud.get({collection:"UserType", token:token})

    if(result.status == "Success")
      return true
    else
      return false
  }

  public async verifyAdmin(token : string): Promise<any> {
    const result: any = await _crud.get({collection:"user", token:token})

    if(result.status == "Success" && result.data.userType == "2")
      return true
    else
      return false
  }

  public async getUser(uid: string): Promise<UserModel[]> {
    const result: any = await _crud.get({collection:"user", token: uid})
    let user: UserModel[] = []
    
    if(result.status == "Success"){
      user = result.data
    }

    return user
  }

  public async getDevice(uid: string): Promise<any> {
    //const result: any = await _crud.get({collection:"DeviceToken", token: uid})
    const result: any = await _crud.getAllQuery({collection:"DeviceToken", token: uid, parameter: "userUID"})
    let devices: DeviceToken[] = []
    
    if(result.status == "Success"){
      devices = result.data
      return devices
    }

    return false
  }

  public async updateUser(uid: string, name:string): Promise<boolean> {
    const user:any = await this.getUser(uid)
    user.name = name

    const result: any = await _crud.update({collection: "user", token: uid, data:user}) 
    
    if(result.status == "Success") return true
    else return false
  }


  public async changeDevice(token: string, device:string): Promise<any> {
    const data: any = {
      userUID: token,
      tokendevice: device
    }
    const result = await _crud.post({collection:"DeviceToken", data: data})
    return result
  }
  
  public async addFavorites(data: FavoritesCreationParams): Promise<any> {
      const result = await _crud.post({collection:"favorites", data: data})
      return result
  }

  public async delFavorite(uid: String){
    const result = await _crud.DeleteDoc({collection:"favorites", token: uid})
    return result
  }

  public async getFavorite(uid: String): Promise<Favorites[]> {
    const result: any = await _crud.getAllQuery({collection:"favorites", token: uid, parameter: "uidUser"})
    let favorites: Favorites[] = []
    if(result.status == "Success"){
      favorites = result.data
    }
    return favorites
  }

  public async delDevice(tokendevice: String, userUID: String): Promise<any[]> {
    const result: any = await _crud.getAllQuery({collection:"DeviceToken", token: tokendevice, parameter: "tokendevice"})
    const resultDel: any[] = []
    for await (const res of result.data) {
      if(res.userUID == userUID)
        resultDel.push(await _crud.DeleteDoc({collection:"DeviceToken", token: res.uid}))
    }
    return resultDel
  }
}