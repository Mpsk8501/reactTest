import React from 'react';
import {Form, Button, Modal} from 'react-bootstrap';
import style from './order.module.css';
import FormText from "react-bootstrap/FormText";
import {Link} from "react-router-dom"
import {routesMap} from "../../routs";
import withStore from "../../hocs/withStore";


class Order extends React.Component {
    state = {
        showModal: false
    };

    show = () => {
        this.setState({showModal: true});
    };

    hide = () => {
        this.setState({showModal: false});
    };

    confirm = () =>{
        this.hide();
        this.props.stores.cart.reset();
        this.props.history.push(routesMap.Result)
    };


    render() {
        let FormData = this.props.stores.order;
        let Cart = this.props.stores.cart;

        let formFields = [];
        for (let name in FormData.formData) {
            let field = FormData.formData[name];
            formFields.push(
                <Form.Group key={name} controlId={'order-form-' + name}>
                    <Form.Label>{field.label}</Form.Label>
                    <Form.Control
                        type={field.name}
                        value={field.value}
                        onChange={(e) => FormData.change(name, e.target.value)}
                    />
                    {field.valid === null || field.valid ? '' :
                        <FormText className="text-muted">
                            {field.error}
                        </FormText>
                    }
                </Form.Group>
            );
        }


        return (
            <div>
                <h2>Order</h2>
                <hr/>
                <Form>
                    {formFields}
                </Form>
                <Link className="btn btn-primary"variant="warning" to={routesMap.Home}>
                    Back to cart
                </Link>
                &nbsp;
                <Button variant="primary" disabled={FormData.apply} onClick={this.show}>
                    Apply order
                </Button>
                <Modal show={this.state.showModal} onHide={this.hide} backdrop="static">
                    <Modal.Header closeButton>
                        <Modal.Title>Check information</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h2>Your total price:<span className={style.price}>{Cart.total}P</span></h2>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.hide}>
                            Ooops
                        </Button>
                        <Button variant="primary" onClick={this.confirm}>
                            All right
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default withStore(Order)
