import { BrowserRouter, Routes, Route } from "react-router-dom";

//components:
import Headrecomponent from "./Component/HeaderComponent";
import FooterComponent from "./Component/FooterComponent";

//user components:
import RouteWithUserChatComponent from "./Component/User/RouteWithUserChatComponent";

//publicly available pages:
import Homepage from "./Pages/Homepage";
import ProductDetailsPage from "./Pages/ProductDetailsPage";
import ProductListPage from "./Pages/ProductListPage";
import CartPage from "./Pages/cartpage";
import Loginpage from "./Pages/Loginpage";
import RegisterPage from "./Pages/RegisterPage";

import ProtectedRoutesComponent from "./Component/ProtectedRoutesComponent";

//protected user pages
import UserProfilePage from "./Pages/User/UserProfilePage";
import UserOrderDetailsPage from "./Pages/User/UserOrderDetsilsPage";
import UserCartDetailsPage from "./Pages/User/UserCartDetailsPage";

//protected admin pages
import AdminUsersPage from "./Pages/admin/AdminUsersPage";
import AdminEditUserPage from "./Pages/admin/AdminEditUserPage";
import AdminProductsPage from "./Pages/admin/AdminProductsPage";
import AdminCreateProductPage from "./Pages/admin/AdminCreateProductPage";
import AdminEditProductPage from "./Pages/admin/AdminEditProductPage";
import AdminOrdersPage from "./Pages/admin/AdminOrdersPage";
import AdminOrderDetailsPage from "./Pages/admin/AdminOrderDetailsPage";
import AdminChatsPage from "./Pages/admin/AdminChatsPage";
import AdminAnalyticsPage from "./Pages/admin/AdminAnalyticsPage";

function App() {
  return (
    <BrowserRouter>
      <Headrecomponent />
      <Routes>
        <Route element={<RouteWithUserChatComponent />}>
          {/*publicly available routes:*/}
          <Route path="/" element={<Homepage />} />
          <Route path="/Product-list" element={<ProductListPage />} />
          <Route
            path="/User/product-details"
            element={<ProductDetailsPage />}
          />
          <Route path="/Product-details/:id" element={<ProductDetailsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<Loginpage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element="page not exists 404" />
        </Route>
        {/* <Route path="/" Component={Homepage} /> in the older versions of react-router-dom   */}

        {/*user proctected routes:*/}
        <Route element={<ProtectedRoutesComponent admin={false} />}>
          <Route path="admin/user" element={<UserProfilePage />} />
          <Route path="/user/cart-details" element={<UserCartDetailsPage />} />
          <Route
            path="/user/order-details"
            element={<UserOrderDetailsPage />}
          />
        </Route>

        {/*admin protected routes:*/}
        <Route element={<ProtectedRoutesComponent admin={true} />} />
        <Route path="/admin/users" element={<AdminUsersPage />} />
        <Route path="/admin/edit-users" element={<AdminEditUserPage />} />
        <Route path="/admin/product" element={<AdminProductsPage />} />
        <Route
          path="/admin/create-new-product"
          element={<AdminCreateProductPage />}
        />

        <Route path="/admin/edit-product" element={<AdminEditProductPage />} />
        <Route path="/admin/orders" element={<AdminOrdersPage />} />
        <Route
          path="/admin/order-details"
          element={<AdminOrderDetailsPage />}
        />
        <Route path="/admin/chats" element={<AdminChatsPage />} />
        <Route path="/admin/analytics" element={<AdminAnalyticsPage />} />
      </Routes>
      <FooterComponent />
    </BrowserRouter>
  );
}

export default App;
