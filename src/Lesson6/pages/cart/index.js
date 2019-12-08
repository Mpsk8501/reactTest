import React from 'react';
import AppMinMax from '../../components/inputs/minmax';
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom"
import {routesMap} from "../../routs";
import withStore from "../../hocs/withStore";


class Cart extends React.Component {
    render() {
        let cart = this.props.stores.cart;
        let productsRows = cart.productsDetailed.map((product, i) => {
            if (product) {
                return (
                    <tr key={product.id}>
                        <td>{product.title}</td>
                        <td>{product.price}</td>
                        <td>
                            <AppMinMax min={1}
                                       max={product.rest}
                                       cnt={product.current}
                                       onChange={(current) => cart.change(product.id, current)}
                            />
                        </td>
                        <td>{product.price * product.current}</td>
                        <td>
                            <Button onClick={() => cart.remove(product.id)}>
                                X
                            </Button>
                        </td>
                    </tr>
                );
            }

        });

        return (
            <div>
                <h2>Cart</h2>
                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <td>Title</td>
                        <td>Price</td>
                        <td>Count</td>
                        <td>Total</td>
                        <td>Actions</td>
                    </tr>
                    </thead>
                    <tbody>
                    {productsRows}
                    </tbody>
                </table>
                <h3>Total: {cart.total}</h3>
                <hr/>
                <Link className="btn btn-primary"
                      to={
                          (cart.total) ?
                              routesMap.Order :
                              routesMap.Cart
                      }
                >Send
                </Link>
            </div>
        );
    }
}

export default withStore(Cart)