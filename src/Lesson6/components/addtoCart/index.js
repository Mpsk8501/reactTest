import React from "react";
import Button from "@material-ui/core/Button";
import withStore from "../../hocs/withStore";
import style from './addToCart.module.css'

class AddToCart  extends React.Component {
    toCart(id) {
        this.props.stores.cart.add(id);
    }

    outCart(id) {
        this.props.stores.cart.remove(id);
    }

    render() {
        let CartModel = this.props.stores.cart;
        return (
            CartModel.inCart(this.props.id) ?
                (<Button
                    size="small"
                    color={"secondary"}
                    variant={"outlined"}
                    onClick={() => this.outCart(this.props.id)}
                    disabled={this.props.stores.cart.processId[this.props.id]}
                >
                    Remove in Cart
                </Button>) :
                (<Button
                    className={style.btn}
                    size="small"
                    variant={"outlined"}
                    color={"primary"}
                    onClick={() => this.toCart(this.props.id)}
                    disabled={this.props.stores.cart.processId[this.props.id]}
                >
                    Add to Cart
                </Button>)
        )
    }
}

export default withStore(AddToCart)