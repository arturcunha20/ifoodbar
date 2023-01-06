"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsTypeService = void 0;
class ProductsTypeService {
    get(id, name) {
        return {
            id,
            name: name !== null && name !== void 0 ? name : "Jane Doe",
        };
    }
    create(productsTypeCreationParams) {
        return Object.assign({ id: Math.floor(Math.random() * 10000) }, productsTypeCreationParams);
    }
}
exports.ProductsTypeService = ProductsTypeService;
