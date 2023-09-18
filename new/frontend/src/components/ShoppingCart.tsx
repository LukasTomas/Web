import { useContext } from "react";
import { NavLink } from "react-router-dom";

import { TotalPriceContext } from "../App";

interface Props {
  name: string;
  href: string;
}

function ShoppingCart({ name, href }: Props) {
  let { totalPrice } = useContext(TotalPriceContext);

  // <FontAwesomeIcon icon={faCartShopping} />
  return (
    <>
      <ul className="navbar-nav">
        <li className="nav-item p-0">
          <NavLink
            className="nav-link border border-secondary rounded d-flex align-items-center" // to keep text aligned vertically next to shopping cart
            style={{ paddingTop: "0.9em" }}
            to={href}
          >
            <div
              className="position-relative mr-3"
              style={{ marginRight: "0.8em" }}
            >
              <img src="/shopping-cart.png" alt="Shopping Cart" />
              <div
                className="rounded-circle bg-secondary text-light text-center"
                style={{
                  width: "1.5em",
                  height: "1.5em",
                  position: "absolute",
                  top: "0",
                  right: "0",
                  transform: "translate(50%, -50%)", // Adjust position
                }}
              >
                3
              </div>
            </div>
            <div id="price">{totalPrice != 0 && totalPrice}</div>
          </NavLink>
        </li>
      </ul>
    </>
  );
}

export default ShoppingCart;
