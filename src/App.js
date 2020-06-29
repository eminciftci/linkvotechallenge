import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import ListPage from "./components/ListPage";
import Header from "./components/Header";
import AddItemPage from "./components/AddItemPage";

const App = () => {

        return (
            <div className="app">
                <Header/>
                <Router>
                    <Switch>
                        <Route path={"/addItemPage"} render={(props) => (<AddItemPage {...props}/>)}/>
                        <Route path={"/"} render={(props) => (<ListPage {...props}/>)}/>
                    </Switch>
                </Router>
            </div>
        );

}

export default App;
