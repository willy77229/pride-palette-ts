import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectIsCartOpen } from "../../store/cart/cart.selector";
import { ReactComponent as PPLogo} from "../../assets/pride-palette.svg";
import { selectCurrentUser } from "../../store/user/user.selector";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { NavigationContainer, LogoContainer, NavLinks, NavLink } from "./navigation.styles";
import { signOutStart } from "../../store/user/user.action";

const Navigation = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);

  const signOutUser = () => dispatch(signOutStart()); 

  return(
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <PPLogo className="logo"/>
        </LogoContainer>
        <NavLinks>
          <NavLink to="/shop">SHOP</NavLink>
              {
                currentUser ? (
                  <NavLink as="span" onClick={signOutUser}>SIGN OUT</NavLink>
                ) : (
                  <NavLink to="/auth">
                    SIGN IN
                  </NavLink>
                )
              }
          <CartIcon />
        </NavLinks>
            {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  )
}

export default Navigation;