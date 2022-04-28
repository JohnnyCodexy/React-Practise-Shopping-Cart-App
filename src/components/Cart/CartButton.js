import classes from "./CartButton.module.css";
import { uiSliceActions } from "../store/ui-slice";
import { useSelector, useDispatch } from "react-redux";

const CartButton = (props) => {
  const dispatch = useDispatch();
  const quantity = useSelector((state) => state.cart.totalQuantity);

  const toogleUiHandler = () => {
    dispatch(uiSliceActions.toogle());
  };

  return (
    <button className={classes.button} onClick={toogleUiHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{quantity}</span>
    </button>
  );
};

export default CartButton;
