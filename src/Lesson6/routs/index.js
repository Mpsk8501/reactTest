import Cart from '../pages/cart';
import Order from '../pages/order';
import Result from '../pages/result';
import Home from '../pages/home'
import Task from '../pages/task'
import Page404 from '../pages/error$04';
import OneGoods from '../pages/oneGoods'



let routes =[
    {
        name:'Home',
        url:'/',
        component: Home,
        exact:true,
        nav:true
    },
    {
        name:'Order',
        url:'/order',
        component: Order,
        exact:true,
        nav:true
    },
    {
        name:'Tasks',
        url:'/tasks',
        component: Task,
        exact:true,
        nav:true
    },
    {
        name:'Cart',
        url:'/cart',
        component: Cart,
        exact:true,
        nav:true
    },
    {
        name:'Result',
        url:'/result',
        component: Result,
        exact:true
    },
    {
        name:'oneGoods',
        url:'/products/:id',
        component:OneGoods,
        exact:true
    },
    {
        url:'**',
        component: Page404,
    }
];

let routesMap = {};

routes.forEach((route)=>{
    if(route.hasOwnProperty('name')){
        routesMap[route.name] = route.url;
    }
});

let urlBuilder = function (name,params) {
    if(!routesMap.hasOwnProperty(name)){
        return null
    }

    let url = routesMap[name];
    for (let key in params){
        url = url.replace(':'+key,params[key])
    }

    return url

};

export default routes
export {routesMap,urlBuilder};