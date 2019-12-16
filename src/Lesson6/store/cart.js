import {observable, computed, action,runInAction} from 'mobx';

export default class {
    constructor(rootStore) {
        this.rootStore = rootStore;
        this.api = this.rootStore.api;
        this.storage = this.rootStore.storage;
        this.token = this.storage.getItem('cartToken');
    }

    lastOrderCash = {};

    @observable processId = {};


    @observable products = [];

    @action load(){
        this.api.getCart(this.token).then((data)=>{
            runInAction(()=>{
                this.products = data.cart;
                if(data.needUpdate){
                    this.storage.setItem('cartToken',data['token']);
                }
            })

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
        if(!(id in this.processId)){
            this.processId[id]=true;
            let index = this.products.findIndex((pr) => pr.id === id);
            if (index !== -1) {
                this.api.updateCart(this.token,id,cnt).then(()=> {
                    runInAction(()=>{
                        this.products[index].current = cnt;
                        delete this.processId[id]
                    })
                })
            }
        }

    }


    @action add(id) {
        if(!this.inCart(id)&&!(id in this.processId)){
            this.processId[id]=true;
            this.api.addToCart(this.token,id).then((res)=>{
                if(res){
                    runInAction(()=>{
                        this.products.push({id, current: 1});
                        delete this.processId[id]
                    })

                }
            })
        }


    }

    @action remove(id) {
        if(this.inCart(id)&&!(id in this.processId)){
            let index = this.products.findIndex((pr) => pr.id === id);
            if (index !== -1) {
                this.processId[id]=true;
                this.api.removeInCart(this.token,id).then(()=>{
                    runInAction(()=>{
                        this.products.splice(index, 1);
                        delete this.processId[id]
                    })
                })
            }
        }

    }
    @action reset() {
        this.lastOrderCash = [];
        this.lastOrderCash.goods = this.products;
        this.lastOrderCash.total = this.total;
        this.lastOrderCash.form = this.rootStore.order.formData;
        return this.api.removeCart(this.token).then((res)=>{
            return new Promise((resolve, reject)=>{
                runInAction(()=>{
                    if(res){
                        this.rootStore.order.reset();
                        this.products=[];
                        resolve()
                    }
                    else reject();
                })

            })
        })
    }
}

