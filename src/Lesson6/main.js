import React from 'react';
import ReactDom from 'react-dom';
import App from './app';
import Store from './store'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Provider} from 'mobx-react'

Store.product.load().then(()=>{
    ReactDom.render(<Provider stores={Store}>
        <App name={'Word'}/>
    </Provider> , document.querySelector('#app'));
});


Store.cart.load()