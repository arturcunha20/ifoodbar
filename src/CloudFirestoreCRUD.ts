import { doc, setDoc, query, collection, where, getDocs } from "firebase/firestore";
import { db, db_firestore } from "./fireabase"
import { v4 as uuidv4 } from 'uuid';



/**
 * 
 * @param req 
 * @returns 
 */
export const get = async (req: any) => {
    try {
        const collection = await db.collection(req.collection);
        const data = await collection.doc(req.token).get();
        if (!data.data()) {
          return ({ status:"404", message: "No records found", data: data.data() });
        } else {
          return ({ status:"Success", data: data.data() });
        }
      } catch (error: any) {
        return ({ status:"404", message: error.message });
      }
};

/**
 * 
 * @param req 
 * @returns 
 */
export const getAll = async (req: any) => {
  try {
      const collection = await db.collection(req.collection).get()   
      const data = await collection.docs.map((doc: any) => doc.data())
      if (data.length > 0) {
        return ({ status:"Success", data: data });
      } else {
        return ({ status:"404", message: "No records found" });
      }  
    } catch (error: any) {
      return ({ status:"404", message: error.message });
    }
};


/**
 * 
 * @param req 
 * @returns 
 */
export const getAllQuery = async (req: any) => {
  try {
      const collections = collection(db_firestore,req.collection)
      const result = query(collections, where(req.parameter, "==", req.token));
      const querySnapshot = await getDocs(result);
      const data = await querySnapshot.docs.map((doc: any) => doc.data())

      if(querySnapshot.docs.length > 0 )
        return ({ status:"Success", data: data });
      else
      {
        return ({ status:"404", message: "No records found" });
      }
    } catch (error: any) {
      return ({ status:"404", message: error.message });
    }
};


/**
 * 
 * @param req 
 * @param uid 
 * @returns 
 */
export const post_user = async (req: any,uid:any) => {
  try {
    var ref = await doc(db_firestore, req.collection, uid);

    const res = await setDoc(ref, req.data)
    .then(async () => {  return ({ status:"Success", message: "Document added with success.", data: req.data}) ;})
    .catch(error => { throw new Error(error.message)})
    return res
  } catch (error: any) {
    return ({ status:"404", message: error.message });
  }
};

/**
 * 
 * @param req 
 * @returns 
 */
export const post = async (req: any) => {
  try {
    const uid = uuidv4()
    if(req.data.uid == undefined) req.data.uid = uid    
    if(req.data.uid != null) req.data.uid = uid
    
    var ref = await doc(db_firestore, req.collection, uid);

    const res = await setDoc(ref, req.data)
    .then(async () => {
      return ({ status:"Success", message: "Document added with success.", data: req.data})
    })
    .catch(error => { throw new Error(error.message)})
    return res
  } catch (error: any) {
    return ({ status:"404", message: error.message });
  }
};


/**
 * 
 * @param req 
 * @returns 
 */
export const update = async (req: any) => {
    try {
        const res = await db.collection(req.collection).doc(req.token).set(req.data)
        .then(() =>{
            return ({ status:"Success", message: "Record Updated successfully" });
        })
        .catch((err: any) => {
            throw new Error(err.message);
        })
        return res
    } catch (error: any) {
      return ({ status:"404", message: error.message });
    }
  };
   

/**
 * 
 * @param req 
 * @returns 
 */
export const DeleteDoc = async (req: any) => {
    try {
        const result = await db.collection(req.collection).doc(req.token).delete()
        .then(() =>{
            return ({ status:"200", message: "Record deleted successfully" });
        })
        .catch((err: any) => {
            throw new Error(err.message);
        })
      return result
    } catch (error: any) {
      return ({ status:"404", message: error.message });
    }
  };