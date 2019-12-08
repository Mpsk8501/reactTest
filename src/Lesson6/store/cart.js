import {observable, computed, action} from 'mobx';

export default class {
    constructor(rootStore) {
        this.rootStore = rootStore;
        this.api = this.rootStore.api;
        this.storage = this.rootStore.storage;
        this.token = this.storage.getItem('cartToken');
    }

    @observable products = [];

    @action load(){
        this.api.getCart(this.token).then((data)=>{
            this.products = data.cart;
            console.log(data);
            if(data.needUpdate){
                this.storage.setItem('cartToken',data['token']);
                console.log(data)
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
        let index = this.products.findIndex((pr) => pr.id === id);
        if (index !== -1) {
            this.products[index].current = cnt;
            console.log(this.products)
        }
    }


    @action add(id) {
        this.products.push({id, current: 1});
        this.api.addToCart(this.token,id)
    }

    @action remove(id) {
        let index = this.products.findIndex((pr) => pr.id === id);
        if (index !== -1) {
            this.products.splice(index, 1);
            this.api.removeInCart(this.token,id)
        }
    }
}

