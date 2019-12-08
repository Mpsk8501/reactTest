import React from 'react';
import {Link} from "react-router-dom"
import {urlBuilder} from "../../routs";
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import style from './home.module.css'
import withStore from "../../hocs/withStore";

import AddToCart from "../../components/addtoCart";



class Home extends React.Component {

    render() {
        let productsModel = this.props.stores.product;
        const Link1 = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />);


        let productsRows = productsModel.products.map((product) => {

            return (
                <Card key={product.id} className={style.card}>
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            {product.title}
                        </Typography>
                        <Typography variant="h5" component="h3">
                            Price: {product.price}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button to={urlBuilder('oneGoods', {id: product.id})}
                                component={Link1}
                                size="small"
                                variant={"outlined"}
                        >
                            Learn More
                        </Button>
                        <AddToCart id={product.id}/>
                    </CardActions>
                </Card>
            );
        });

        return (
            <>
                <hr/>
                <h2>Phones</h2>
                <hr/>
                <div className={style.conteiner}>
                    {productsRows}
                </div>
            </>
        );
    }
}

export default withStore(Home)