import { ReactNode, createContext } from "react";

type CartItem = {
  id: string;
  quantity: number;
};

type ShoppingCartContext = {
  items: CartItem[];

  add: (id: string, quantity: number) => void;
  remove: (id: string, quantity: number) => void;

  getItem: (id: string) => CartItem;

  getTotalQuantity: () => number;
  getTotalPrice: () => number;
};

type ShoppingCartProviderProps = {
  children: ReactNode;
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCartContext() {
  return ShoppingCartContext;
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const context: ShoppingCartContext = {

    add: function(id, quantity) {
        
    }

  };

  return (
    <ShoppingCartContext.Provider value={context}>
      {children}
    </ShoppingCartContext.Provider>
  );
}
