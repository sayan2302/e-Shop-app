import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {

    const [cart, setCart] = useState([]);
    const [orders, setOrders] = useState([]);
    const [idCount, setIdCount] = useState([])
    const [total, setTotal] = useState(0)

    return (
        <AppContext.Provider
            value={{
                cart,
                setCart,

                idCount,
                setIdCount,

                orders,
                setOrders,

                total,
                setTotal
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
