import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import ProductDetailsPage from "./Pages/ProductDetailsPage";
import ProductListPage from "./Pages/ProductListPage";
import CartPage from "./Pages/cartpage";
import Loginpage from "./Pages/Loginpage";
import RegisterPage from "./Pages/RegisterPage";
import UserProfilePage from "./Pages/User/UserProfilePage";
import UserOrderDetailsPage from "./Pages/User/UserOrderDetsilsPage";
import UserCartDetailsPage from "./Pages/User/UserCartDetailsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/Product-list" element={<ProductListPage />} />
        <Route path="/Product-details" element={<ProductDetailsPage />} />
        <Route path="/Product-details/:id" element={<ProductDetailsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element="page not exists 404" />
        {/* <Route path="/" Component={Homepage} /> in the older versions of react-router-dom   */}
        <Route path="/user" element={<UserProfilePage />} />
        <Route path="/user" element={<UserCartDetailsPage />} />
        <Route path="/user" element={<UserOrderDetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
