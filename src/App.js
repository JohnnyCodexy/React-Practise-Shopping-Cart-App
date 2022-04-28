import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { uiSliceActions } from "./components/store/ui-slice";
import React from "react";
import Notification from "./components/UI/Notification";

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const showcart = useSelector((state) => state.ui.cartIsVisible);
  const cartData = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        "https://react-redux-bb46f-default-rtdb.europe-west1.firebasedatabase.app/cart.json"
      );
      const data = await response.json();
      return data;
    };
    getData();
  }, []);

  useEffect(() => {
    const sendCartData = async () => {
      dispatch(
        uiSliceActions.showNotification({
          status: "sending",
          title: "Sending...",
          message: "Sending data",
        })
      );
      const response = await fetch(
        "https://react-redux-bb46f-default-rtdb.europe-west1.firebasedatabase.app/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cartData),
        }
      );
      if (!response.ok) {
        throw new Error("Sending data failed");
      }
      dispatch(
        uiSliceActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Data sent Successfully",
        })
      );
    };

    if (isInitial) {
      isInitial = false;
      return;
    }
    sendCartData().catch((error) => {
      dispatch(
        uiSliceActions.showNotification({
          status: "error",
          title: "Error",
          message: "error",
        })
      );
    });
  }, [cartData, dispatch]);

  return (
    <React.Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showcart && <Cart />}
        <Products />
      </Layout>
    </React.Fragment>
  );
}

export default App;
