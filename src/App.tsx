import { Navigate, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import HomePage from "./pages/HomePage";
import AuthCallbackPage from "./pages/AuthCallbackPage";
import UserProfilePage from "./pages/UserProfilePage";
import ProtectedRoutes from "./auth0/ProtectedRoutes";
import ManageRestaurantsPage from "./pages/ManageRestaurantsPage";
import SearchPage from "./pages/SearchPage";
import RestaurantDetailPage from "./pages/RestaurantDetailPage";
import OrderStatusPage from "./pages/OrderStatusPage";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout showHero>
            <HomePage />
          </Layout>
        }
      />
      <Route path="/auth-callback" element={<AuthCallbackPage />} />
      <Route
        path="/details/:restaurantId"
        element={
          <Layout>
            <RestaurantDetailPage />
          </Layout>
        }
      />
      <Route
        path="/search/:city"
        element={
          <Layout>
            <SearchPage />
          </Layout>
        }
      />
      <Route element={<ProtectedRoutes />}>
        <Route
          path="/order-status"
          element={
            <Layout>
              <OrderStatusPage />
            </Layout>
          }
        />
        <Route
          path="/profile"
          element={
            <Layout>
              <UserProfilePage />
            </Layout>
          }
        />
        <Route
          path="/manage-restaurants"
          element={
            <Layout>
              <ManageRestaurantsPage />
            </Layout>
          }
        />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
