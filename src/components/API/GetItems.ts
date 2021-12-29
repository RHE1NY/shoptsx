import db from "../firebase.config";


export default class getShopItems {
    static async getCategories() {
        const jewelryCollection = db.collection('products');
        const response = jewelryCollection.get();
        return response;
    }

    static async getProducts() {
        const productsCollection = db.collection('productItems');
        const response = productsCollection.get();
        return response;
    }

    static async getProductItem(id:string) {
        const prodItem = db.collection('productItems').doc(id);
        const response = prodItem.get();
        return response;
    }

    static async getCategoryProducts (id:string) {
        const productsCollection = db.collection('productItems');
        const response = await productsCollection.where('uniqid', '==', id).get()
        return response;
    }


}