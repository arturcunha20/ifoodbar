/**
 *
 * @export
 * @interface ProductsType
 */
export interface ProductsType {
    /**
     *
     * @type {string}
     * @memberof ProductsType
     */
    uid: string;
    /**
     *
     * @type {string}
     * @memberof ProductsType
     */
    name: string;
}


/**
 *
 * @export
 * @interface Products
 */
export interface Products{
    /**
     *
     * @type {string}
     * @memberof Products
     */
    uid: string;
    /**
     *
     * @type {string}
     * @memberof Products
     */
    name: string;
    /**
     *
     * @type {number}
     * @memberof Products
     */
    price: number;  
    /**
     *
     * @type {string}
     * @memberof Products
     */  
    type: string;    
    /**
     *
     * @type {string}
     * @memberof Products
     */  
    urlImage: string;    
}