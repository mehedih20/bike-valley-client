import { Spinner } from "react-bootstrap";
import { Redirect, Route } from "react-router";
import useAuth from "../Hooks/useAuth";

function PrivateRoute({ children, ...rest }) {
  let { user, loading } = useAuth();

  if (loading) {
    return (
      <span className="auth-spinner-container">
        <Spinner className="auth-spinner" animation="border" variant="danger" />
      </span>
    );
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
