/**
 *
 * @export
 * @interface Orders
 */
export interface Orders {
    /**
     *
     * @type {string}
     * @memberof ProductsType
     */
    uid: string;

    /**
     *
     * @type {string}
     * @memberof datetime
     */
    datetime: string;

    /**
     *
     * @type {number}
     * @memberof price
     */
    price: number;

    /**
     *
     * @type {string}
     * @memberof description
     */
    description: string;

    /**
     *
     * @type {number}
     * @memberof state
     */
    state: number;

    /**
     *
     * @type {string}
     * @memberof string
     */
    UserUid: string;
}


/**
 *
 * @export
 * @interface OrdersProducts
 */
export interface OrdersProducts{
    /**
     *
     * @type {string}
     * @memberof Orders_uID
     */
    Orders_uID: string;

    /**
     *
     * @type {string}
     * @memberof Products_uID
     */
    Products_uID: string;
    
    /**
     *
     * @type {number}
     * @memberof Products
     */
    Quantity: number;  
}