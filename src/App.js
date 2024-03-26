import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Header from './components/Header';
import HomePage from './components/HomePage';
import ItemDescriptionPage from './components/ItemDescriptionPage';
import CartPage from './components/CartPage';
import OrdersPage from './components/OrdersPage';
import CategoryPage from './components/CategoryPage';


const App = () => {
  return (
    <Router>
      <AppProvider>
        <div >
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/category/" element={<CategoryPage />} />
            <Route path="/item/" element={<ItemDescriptionPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/orders" element={<OrdersPage />} />
          </Routes>
        </div>
      </AppProvider>
    </Router>
  );
};

export default App;
