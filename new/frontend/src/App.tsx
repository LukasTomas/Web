import { createContext, useState, Dispatch, SetStateAction } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";

import Home from "./pages/Home";
import Eshop from "./pages/Eshop";
import Contact from "./pages/Contact";
import ShoppingCartPage from "./pages/ShoppingCart";
import PenDetails from "./pages/PenDetails";

const TotalPriceContext = createContext<{
  totalPrice: number;
  setTotalPrice: Dispatch<SetStateAction<number>>;
}>({
  totalPrice: 0,
  setTotalPrice: () => {}, // Provide an initial empty function
});

function App() {
  const [totalPrice, setTotalPrice] = useState();

  const navOptions = [
    { name: "Home", href: "/home", element: <Home /> },
    { name: "E-shop", href: "/e-shop", element: <Eshop /> },
    { name: "Contact", href: "/contact", element: <Contact /> },
  ];

  const ShoppingCartInfo = {
    name: "Košík",
    href: "/shopping-cart",
    element: <ShoppingCartPage />,
  };

  return (
    <>
      <TotalPriceContext.Provider value={{ totalPrice, setTotalPrice }}>
        <Header mainNav={navOptions} shoppingCartInfo={ShoppingCartInfo} />

        <Routes>
          {navOptions
            .concat(ShoppingCartInfo)
            .map(({ name, href, element }) => (
              <Route key={"route_" + name} path={href} element={element} />
            ))}

          <Route path="/pen/:id" element={<PenDetails />} />
        </Routes>
      </TotalPriceContext.Provider>
    </>
  );
}

export default App;
export { TotalPriceContext };
