import React from 'react';
import {Link} from "react-router-dom"
import AddToCart from "../addtoCart";

export default
 function(props)  {
    return (
        <>
            <h2>{props.title}</h2>
            <hr/>
            <div>
                <p>
                    {props.description}
                </p>
                <h2>Price: {props.price}P.</h2>
                <AddToCart id={props.id} />
                <hr/>
                <Link
                    to={props.backUrl}
                    className={'btn btn-primary'}>
                    Back to list
                </Link>
            </div>
        </>
    )
}

