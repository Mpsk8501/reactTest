import CartStore from './cart';
import OrderStore from './form';
import ProductStore from './products';
import Notifications from './notifications';
import * as api from '../api/makeRequest';
import {configure} from "mobx";

configure({enforceActions:"observed"})

class RootStore {
    constructor(){
        this.api= api;
        this.storage = localStorage;
        this.cart = new CartStore(this);
        this.product = new ProductStore(this);
        this.order = new OrderStore(this);
        this.notifications = new Notifications(this)

    }


}

export  default new RootStore()