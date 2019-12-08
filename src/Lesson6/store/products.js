import {observable, computed, action} from 'mobx';


export default class {
    constructor(rootStore) {
        this.rootStore = rootStore;
        this.api = this.rootStore.api;
    }

   /* @observable products =  getProducts()*/

    @observable products = [];

    @action load(){
        return new Promise((resolve, reject) =>{
            this.api.all().then((e)=>{
                this.products = e;
                resolve(true)
            }).catch((e)=>{
                console.log(e)
            });

        })

    }

    @computed get productsMap() {
        let map = {};
         this.products.forEach((pr, i) => {
             map[pr.id.toString()] = i
         });
         return map;
    }

    getOneById(id) {
        let index = this.productsMap[id];
        if (index === undefined) {
            return null;
        }
        return this.products[index]
    }

    @action addToCart(id) {
        this.getOneById(id).inCart = true
    }

    @action removeInCart(id) {
        this.getOneById(id).inCart = false
    }

    @action addProd(id) {
        this.getOneById(id).inCart = true
    }


}

// server api


/*function getProducts() {

    return [
        {
            id: 100,
            title: 'Ipnone 200',
            price: 12000,
            rest: 10,
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium autem corporis harum' +
                ' non!'
        },
        {
            id: 101,
            title: 'Samsung AAZ8',
            price: 22000,
            rest: 5,
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium autem corporis harum' +
                ' non!'
        },
        {
            id: 103,
            title: 'Nokia 3310',
            price: 5000,
            rest: 2,
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium autem corporis harum' +
                ' non!'

        },
        {
            id: 105,
            title: 'Huawei ZZ',
            price: 15000,
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium autem corporis harum' +
                ' non!',
            rest: 8
        }
    ];
}*/
