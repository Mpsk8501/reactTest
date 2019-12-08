import CartStore from './cart';
import OrderStore from './form';
import ProductStore from './products';
import * as api from '../api/makeRequest';

class RootStore {
    constructor(){
        this.api= api;
        this.storage = localStorage

        this.cart = new CartStore(this);
        this.product = new ProductStore(this);
        this.order = new OrderStore(this);

    }


}

export  default new RootStore()