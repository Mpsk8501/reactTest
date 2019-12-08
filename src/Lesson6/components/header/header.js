import React from 'react';
import {Link,NavLink} from 'react-router-dom'
import routes, {routesMap} from "../../routs";
import Auth from '../auth/auth'
import withStore from "../../hocs/withStore";
import Style from "./header.module.css";


class Header extends React.Component {
    render() {
        let inCart = this.props.stores.cart.products.length;
        let total = this.props.stores.cart.total;
        let link = routes.map((rout) => {
            if (rout.nav) {
                return (
                    <li key={rout.url}>
                        <NavLink
                            to={routesMap[rout.name]}
                            exact={true}
                            activeClassName={Style.selected}
                        >
                            {rout.name}
                        </NavLink>
                    </li>
                )
            }
        });
        return (
            <div className={Style.header}>
                <Link
                    className={Style.headerLink}
                    to={routesMap['Cart']}>
                    <span>Cart: {inCart}</span> <br/>
                    <span>Total: {total}</span>
                </Link>
                <Auth/>
                <hr/>
                <nav className={Style.nav}>
                    <ul>
                        {link}
                    </ul>
                </nav>
            </div>
        );
    }
}

export default withStore(Header)