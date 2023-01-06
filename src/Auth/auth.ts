import { NextFunction } from "express"
import { admin } from "../fireabase"


/**
 * Check the user token
 * @param req 
 * @param res 
 * @param next 
 */
export const CheckToken = async (req: any, res: any, next: NextFunction) => {
    try {
        let token = ""
        if(req.headers['authorization']){
            token = req.headers['authorization'].replace('Bearer ', '');
        }
        if(req.body.token){
            token = req.body.token
        }

        if (!token) {
            throw new Error("Please authenticate"); 
        }
        await admin.auth().verifySessionCookie(token, true)
        .then((UserData : any) => {
            req.body.token = UserData.uid
        }).catch((err : any) => {
            throw new Error(err.message);
        })
        
        next();
    } catch (err) {
        res.status(401).send(err)
    }
}