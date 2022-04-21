import React from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import BarChart from "../../components/charts/Bar";
import PieChart from "../../components/charts/PieChart";
import {
  MdShoppingBag,
  MdOutlineInfo,
  MdOutlinePayment,
  MdOutlineMoney,
  MdStarRate,
  MdStarOutline,
  MdStarHalf,
} from "react-icons/md";

function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h4 className="text-muted">Sales overview</h4>
        <div class="form-group">
          <select class="custom-select form-select" name="" id="">
            <option value="7">7 days</option>
            <option value="30">30 days</option>
          </select>
        </div>
      </div>
      <div className="col-12 col-md-6 col-lg-4 mb-3">
        <div className="card">
          <div className="card-body">
            <div className="d-flex justify-content-end">
              <MdOutlineInfo size={20} />
            </div>
            <div className="d-flex justify-content-start mt-3">
              <div className="me-3">
                <span className="mx-1 track-icon bg-info rounded-circle px-3 py-2">
                  <MdShoppingBag size={28} className="mb-1" />
                </span>
              </div>
              <div>
                <p className="text-muted mb-0">Total orders</p>
                <h1 className="h11">30</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-12 col-md-6 col-lg-4 mb-3">
        <div className="card">
          <div className="card-body">
            <div className="d-flex justify-content-end">
              <MdOutlineInfo size={20} />
            </div>
            <div className="d-flex justify-content-start mt-3">
              <div className="me-3">
                <span className="mx-1 track-icon bg-yellow rounded-circle px-3 py-2">
                  <MdOutlineMoney size={28} className="mb-1" />
                </span>
              </div>
              <div>
                <p className="text-muted mb-0">This month sales</p>
                <h1 className="h1">Ghc 300</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-12 col-md-6 col-lg-4 mb-3">
        <div className="card">
          <div className="card-body">
            <div className="d-flex justify-content-end">
              <MdOutlineInfo size={20} />
            </div>
            <div className="d-flex justify-content-start mt-3">
              <div className="me-3">
                <span className="mx-1 track-icon bg-light rounded-circle px-3 py-2">
                  <MdOutlinePayment size={28} className="mb-1" />
                </span>
              </div>
              <div>
                <p className="text-muted mb-0">Total sales</p>
                <h1 className="h1">Ghc 500</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-md-6 mb-3">
        <div className="card">
          <div className="card-body">
            <h4 className="">Monthly sales</h4>
            <BarChart />
          </div>
        </div>
      </div>
      <div className="col-md-6 mb-3">
        <div className="card">
          <div className="card-body w-75 mx-md-auto">
            <h4 className="mb-4">Items Selling</h4>
            <div className="d-flex justify-content-center">
              <PieChart />
            </div>
          </div>
        </div>
      </div>

      <div className="col-lg-6 mb-3">
        <div className="card">
          <div className="card-body">
            <h4 className="">Reviews</h4>
            <div className="">
              <ul className="list-group list-group-flush">
                <li className="list-group-item ps-0 d-flex justify-content-between pe-0 py-3">
                  <span className="">Simon</span>
                  <span className=""> lorem</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-6 mb-3">
        <div className="card">
          <div className="card-body">
            <h4 className="">Ratings</h4>
            <div className="">
              <ul className="list-group list-group-flush">
                <li className="list-group-item ps-0 d-flex justify-content-between pe-0 py-3">
                  <span className="">Banku</span>
                  <span className="d-flex align-items-center">
                    <span className="me-2">4</span>
                    <span>
                      <MdStarRate />
                      <MdStarRate />
                      <MdStarRate />
                      <MdStarHalf />
                      <MdStarOutline />
                    </span>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default DashboardPage;
