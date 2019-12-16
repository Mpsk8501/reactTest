import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import routes from "../routs";
import Header from '../components/header/header'
import Notifications from '../pages/notifications'

import withStore from "../hocs/withStore";

class App extends React.Component{
    render(){
        let routsComponents = routes.map((rout)=>{

            return <Route key = {rout.url}
                          path ={rout.url}
                          component = {rout.component}
                          exact={rout.exact}/>
        });

        return (
            <Router>
                <Notifications/>
                <div className="container">
                    <h2>Hello {this.props.name}!!!</h2>
                    <hr/>
                    <Header/>
                    <Switch>
                        {routsComponents}
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default withStore(App)
