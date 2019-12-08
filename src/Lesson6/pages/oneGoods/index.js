import React from 'react';
import Item from './../../components/oneitem'
import E404 from './../error$04'
import {routesMap} from "../../routs";
import withStore from "../../hocs/withStore";

class OneGood extends React.Component  {
    render() {
        let id = this.props.match.params.id;
        let productsModel = this.props.stores.product;
        let one = productsModel.getOneById(id);


        return (
           (one===null)?<E404/>
                : <Item
                    title={one.title}
                    description ={one.description}
                    price = {one.price}
                    backUrl={routesMap.Home}
                    id={one.id}
                    />

        );
    }
}

export default withStore(OneGood)

