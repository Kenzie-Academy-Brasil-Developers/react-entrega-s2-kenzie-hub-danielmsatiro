import { Route, Switch } from "react-router"
import { Dashboard } from "../pages/Dashboard"
import { Login } from "../pages/Login"
import { Signup } from "../pages/Signup"


export const Routes = () => {
    return (
        <Switch>
            <Route exact path="/">
                <Login />
            </Route>
            <Route exact path="/signup">
                <Signup />
            </Route>
            <Route exact path="/dashbord">
                <Dashboard />
            </Route>
        </Switch>
    )
}