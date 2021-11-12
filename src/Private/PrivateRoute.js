import { Redirect, Route } from "react-router";
import useAuth from "../Hooks/useAuth";
import BikeSpinner from "../Pages/Shared/Spinner/BikeSpinner";

function PrivateRoute({ children, ...rest }) {
  let { user, loading } = useAuth();

  if (loading) {
    return <BikeSpinner type="danger" />;
  }

  return (
    <Route
      {...rest}
      render={({ location }) =>
        user.displayName ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
