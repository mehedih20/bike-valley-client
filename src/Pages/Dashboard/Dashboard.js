import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import {
  Switch,
  Route,
  Link,
  useRouteMatch,
  useHistory,
} from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { FcHome } from "react-icons/fc";
import "./Dashboard.css";
import MyOrders from "./Body/MyOrders/MyOrders";
import Review from "./Body/Review/Review";
import Pay from "./Body/Pay/Pay";
import AddProduct from "./Body/AddProduct/AddProduct";
import ManageProducts from "./Body/ManageProducts/ManageProducts";
import MakeAdmin from "./Body/MakeAdmin/MakeAdmin";
import Welcome from "./Body/Welcome/Welcome";
import ManageOrder from "./Body/ManageOrder/ManageOrder";
import useAuth from "../../Hooks/useAuth";
import BikeSpinner from "../Shared/Spinner/BikeSpinner";

const Dashboard = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [dataUser, setDataUser] = useState({});
  const [showNav, setShowNav] = useState(true);
  let { path, url } = useRouteMatch();
  const { user, handleLogout } = useAuth();
  const uri = `https://desolate-wave-42377.herokuapp.com/users/${user.email}`;

  useEffect(() => {
    fetch(uri)
      .then((res) => res.json())
      .then((data) => {
        setDataUser(data);
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="dashboard">
      <div className="dashboard-top px-5 py-4 d-flex justify-content-between">
        <Button
          className="dash-btn"
          onClick={() => setShowNav(!showNav)}
          variant="primary"
        >
          <GiHamburgerMenu className="fs-4" />
        </Button>
        <h2 className="text-light">Dashboard</h2>
      </div>

      {loading ? (
        <BikeSpinner type="info" />
      ) : (
        <div className="dashboard-body">
          <div className={`${showNav ? "dash-left" : "width-0"}`}>
            {dataUser?.role === "admin" ? (
              <ul className="dash-links">
                <li className="dash-home">
                  <Link to="/">
                    <FcHome className="mb-1" /> Home
                  </Link>
                </li>
                <li>
                  <Link to={`${url}/manageOrder`}>Manage Orders</Link>
                </li>
                <li>
                  <Link to={`${url}/manageProducts`}>Manage Products</Link>
                </li>
                <li>
                  <Link to={`${url}/addProduct`}>Add Product</Link>
                </li>
                <li>
                  <Link to={`${url}/makeAdmin`}>Make Admin</Link>
                </li>
              </ul>
            ) : (
              <ul className="dash-links">
                <li className="dash-home">
                  <Link to="/">
                    <FcHome className="mb-1" /> Home
                  </Link>
                </li>
                <li>
                  <Link to={`${url}/myOrders`}>My Orders</Link>
                </li>
                <li>
                  <Link to={`${url}/review`}>Review</Link>
                </li>
                <li>
                  <Link to={`${url}/payment`}>Payment</Link>
                </li>
              </ul>
            )}
            <Button
              variant="danger"
              className="fs-4 ms-4 px-3 font-cursive"
              onClick={() => handleLogout(history)}
            >
              Logout
            </Button>
          </div>
          <div className={`${showNav ? "dash-right" : "width-100"}`}>
            <Switch>
              <Route exact path={path}>
                <Welcome />
              </Route>
              <Route path={`${path}/review`}>
                <Review />
              </Route>
              <Route path={`${path}/myOrders`}>
                <MyOrders />
              </Route>
              <Route path={`${path}/payment`}>
                <Pay />
              </Route>
              <Route path={`${path}/manageOrder`}>
                <ManageOrder />
              </Route>
              <Route path={`${path}/manageProducts`}>
                <ManageProducts />
              </Route>
              <Route path={`${path}/addProduct`}>
                <AddProduct />
              </Route>
              <Route path={`${path}/makeAdmin`}>
                <MakeAdmin />
              </Route>
            </Switch>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
