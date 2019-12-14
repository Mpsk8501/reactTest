import {observable, computed, action} from 'mobx';

export default class {
    constructor(rootStore) {
        this.rootStore = rootStore;
        this.api = this.rootStore.api;
        this.storage = this.rootStore.storage;
        this.token = this.storage.getItem('cartToken');
    }

    lastOrderCash = {};

    @observable isBlocked = false;

    @observable products = [];

    @action load(){
        this.api.getCart(this.token).then((data)=>{
            this.products = data.cart;
            if(data.needUpdate){
                this.storage.setItem('cartToken',data['token']);
            }
        })
    }

    @computed get productsDetailed() {
        return this.products.map((pr) => {
            let product = this.rootStore.product.getOneById(pr.id);
            return {...product, current: pr.current}
        });
    }

    @computed get total() {
        return this.productsDetailed.reduce((t, pr) => {
            return t + pr.price * pr.current
        }, 0)
    }

    @computed get inCart() {
        return (id) => this.products.some((product) => product.id === id);
    }

    @action change(id, cnt) {
        this.isBlocked = true;
        let index = this.products.findIndex((pr) => pr.id === id);
        if (index !== -1) {
            this.api.updateCart(this.token,id,cnt).then(()=> {
                this.products[index].current = cnt;
                this.isBlocked = false;
            })
        }
    }


    @action add(id) {
        this.api.addToCart(this.token,id).then(()=>{
            this.products.push({id, current: 1});
        })
    }

    @action remove(id) {
        let index = this.products.findIndex((pr) => pr.id === id);
        if (index !== -1) {
            this.api.removeInCart(this.token,id).then(()=>{
                this.products.splice(index, 1);
            })
        }
    }
    @action reset() {
        this.lastOrderCash = [];
        this.lastOrderCash.goods = this.products;
        this.lastOrderCash.total = this.total;
        this.lastOrderCash.form = this.rootStore.order.formData;
        this.api.removeCart(this.token).then(()=>{
            this.rootStore.order.reset();
            this.products=[]
        })
    }
}

