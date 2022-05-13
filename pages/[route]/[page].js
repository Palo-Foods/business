import React from "react";
import { useRouter } from "next/router";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import AccountPage from "../account";
import OrdersPage from "../orders";
import PaymentsPage from "../payments";
import DashboardPage from "../dashboard";
import ProductsPage from "../products";
import AddProductPage from "../products/add-product";
import SalesPage from "../sales";
import AddFilePage from "../media";
function Page() {
  const route = useRouter();

  return (
    <div>
      <DashboardLayout>
        <div className="container-lg px-3 my-3">
          <div className="row">
            {route?.query.page === "home" && <DashboardPage />}
            {route?.query.page === "orders" && <OrdersPage />}
            {route?.query.page === "sales" && <SalesPage />}
            {route?.query.page === "products" && <ProductsPage />}
            {route?.query.page === "media" && <AddFilePage />}
            {route?.query.page === "add-to-products" && <AddProductPage />}
            {route?.query.page === "account" && <AccountPage />}
            {route?.query.page === "payments" && <PaymentsPage />}
          </div>
        </div>
      </DashboardLayout>
    </div>
  );
}

export default Page;
