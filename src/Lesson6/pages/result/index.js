import React from 'react';
import {inject} from "mobx-react";


export default
@inject('stores')
class extends React.Component{
    render(){
        let FormData = this.props.stores.order;
        let cartModel = this.props.stores.cart;
        return (
            <div>
                <h2>{FormData.data['name']} Congratulations!</h2>
                <p><strong>Total: {cartModel.total}</strong></p>
            </div>
        )
    }
}