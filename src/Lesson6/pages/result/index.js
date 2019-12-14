import React from 'react';
import {inject} from "mobx-react";
import {Button} from "@material-ui/core";
import {Link} from "react-router-dom";



export default
@inject('stores')
class extends React.Component{


    get productsDetailed() {
        return this.props.stores.cart.lastOrderCash.goods.map((pr) => {
            let product = this.props.stores.product.getOneById(pr.id);
            return {...product, current: pr.current}
        });
    }



    render(){
        let productsRows = this.productsDetailed.map((product, i) => {
            if (product) {
                return (
                    <tr key={product.id}>
                        <td>{product.title}</td>
                        <td>{product.price}</td>
                        <td>{product.price * product.current}</td>
                    </tr>
                );
            }
        });
        let name = this.props.stores.cart.lastOrderCash.form.name.value
        let total = this.props.stores.cart.lastOrderCash.total;
        return (
            <div>
                <h2>Congratulations! {name}</h2>
                <h2>Your Order</h2>
                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <td>Title</td>
                        <td>Price</td>
                        <td>Total</td>
                    </tr>
                    </thead>
                    <tbody>
                    {productsRows}
                    </tbody>
                </table>
                <p><strong>Total: {total}</strong></p>
                <Button
                    variant={"outlined"}
                    to={'/'}
                    color={"primary"}
                    component={Link}
                >
                    Back to home
                </Button>
            </div>
        )
    }
}