import React from "react";
import {Link} from 'react-router-dom';
import {routesMap} from "../../../routs";
import Alert from "react-bootstrap/Alert";


export default function () {
    return(
        <>
            <hr/>
            <Alert variant={"success"} className="alert alert-warning">
                <h1>Error 404, page not found</h1>
                <Alert.Heading>
                    <Link to={routesMap.Home}>
                        Go to home page
                    </Link>
                </Alert.Heading>
            </Alert>
        </>
    )
}