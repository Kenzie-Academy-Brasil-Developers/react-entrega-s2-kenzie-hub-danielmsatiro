import { Redirect } from "react-router"

export const Dashboard = ({authenticated}) => {

    if (!authenticated) {
        return <Redirect to="/" />;
      }

    return (
        <h2>Dashboard</h2>
    )
}