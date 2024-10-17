import React, { useEffect } from "react";
import { ProductUpload } from "./components/productUpload";
import { LandingPage } from "./view/LandingPage/landing";
import { register } from "./view/User/register";
import { login } from "./view/User/login";
import { profile } from "./view/profile/profile";
import { AdminLanding } from "./view/admin/adminLanding";
import { Product } from "./view/product";
import adminCustomizeHeader from "./view/admin/adminCustomizeHeader";
import AdminProducts from "./view/admin/adminProducts";
import Cart from "./view/cart";
import { OrderPage } from "./view/orderpage";
import { PlaceOrder } from "./components/PlaceOrder";
import ContactUs from "./components/contact-us";

import "@fortawesome/fontawesome-free/css/all.min.css";
import { Provider } from "react-redux";

import store from "./app/store";

// import "./adminPanel/assets/scss/argon-dashboard-react.scss"

// import {AdminPanel} from "./view/admin/adminIndex"

// import {Activewear}

import "./App.css";
import "./assets/css/style.css";
import "./assets/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/plugins.css";
import "./assets/css/responsive.css";
import "./assets/fonts/fontawesome-webfont3e6e.eot";
import "./assets/css/styles.scss";
// import '././adminPanel/adminStyles/style.css';

import Popup from "./view/LandingPage/Popup";
import { AppProviders } from "./contexts/appprovider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// import '././adminPanel/charts/ChartjsConfig';

// Import pages
// import Dashboard from '././adminPanel/pages/Dashboard';

// import SimpleSlider from "./carousel";
// import Slider from "react-slick";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  useLocation,
} from "react-router-dom";
import { ProductDisplay } from "./components/ProductDisplay";

import Loader from "./components/Loader";
import { OrderConfirmed } from "./components/OrderConfirmed";
import { adminInfo } from "./view/admin/adminInfo";
import { Orders } from "./view/admin/adminOrders";
import { terms } from "./components/terms";
import privacy from "./components/privacy";
import ResultList from "./components/searchResults";
import WishList from "./view/wishlist";
import ProtectedRoute from "./view/protectedRoutes";
import UnauthorizedPage from "./view/UnauthorizedPage";

const queryClient = new QueryClient();

const App = () => {
  return (
    // <SimpleSlider />
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AppProviders>
          <Loader />
          <Router>
            <div className="App">
              {/* <LandingPage /> */}
              <Popup />
              <Routes>
              <Route path="/unauthorized" element={<UnauthorizedPage />} />
                {/* Public Routes */}
                <Route path="/" Component={LandingPage} />
                <Route path="/login" Component={login} />
                <Route path="/register" Component={register} />
                <Route path="/user/profile" Component={profile} />
                <Route path="/user/cart" Component={Cart} />
                <Route path="/user/checkout" Component={OrderPage} />
                <Route path="/user/checkout/success" Component={PlaceOrder} />
                <Route
                  path="/user/checkout/success/confirmed"
                  Component={OrderConfirmed}
                />
                <Route path="/women/product/:productId" element={<Product />} />
                <Route
                  path="/women/:category/:subcategory?"
                  element={<ProductDisplay />}
                />
                <Route path="/contactus" Component={ContactUs} />
                <Route path="/terms" Component={terms} />
                <Route path="/privacy" Component={privacy} />
                <Route path="/search" Component={ResultList} />
                <Route path="/user/wishlist" Component={WishList} />

                {/* Admin-only Routes */}
                <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
                  <Route path="/admin/adminpanel" Component={AdminLanding} />
                  <Route
                    path="/admin/adminproducts"
                    Component={AdminProducts}
                  />
                  <Route path="/admin/adminInfo" Component={adminInfo} />
                  <Route path="/admin/Orders" Component={Orders} />
                  <Route
                    path="/admin/customizeheader"
                    Component={adminCustomizeHeader}
                  />
                </Route>
              </Routes>
            </div>
          </Router>
        </AppProviders>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
