import React from "react";
import BarChart from "../../components/charts/Bar";
import PieChart from "../../components/charts/PieChart";
import {
  MdShoppingBag,
  MdOutlineInfo,
  MdOutlinePayment,
  MdStarRate,
  MdStarOutline,
  MdStarHalf,
  MdBikeScooter
} from "react-icons/md";
import { useStates } from "../../hooks/useStates";

function SalesPage() {
  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h6 className="text-muted mb-0">Sales overview</h6>
        <div className="form-group">
          <select className="custom-select form-select px-3 py-1" name="" id="">
            <option value="1">Today</option>
            <option value="7">This week</option>
            <option value="30">This month</option>
          </select>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-sm-6 col-md-4 mb-3">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-end">
                <MdOutlineInfo size={18} className="text-muted" />
              </div>
              <div className="d-flex justify-content-start align-items-center">
                <div className="me-3">
                  <span className="mx-1 bg-info p-3 rounded-circle">
                    <MdShoppingBag size={22} className="mb-2" />
                  </span>
                </div>
                <div>
                  <p className="text-muted mb-0">Total orders</p>
                  <h1 className="h2">30</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-md-4 mb-3">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-end">
                <MdOutlineInfo size={18} className="text-muted" />
              </div>
              <div className="d-flex justify-content-start align-items-center">
                <div className="me-3">
                  <span className="mx-1 bg-warning p-3 rounded-circle">
                    <MdBikeScooter size={22} className="mb-1" />
                  </span>
                </div>
                <div>
                  <p className="text-muted mb-0">Deliveries</p>
                  <h1 className="h2">30</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-4 mb-3">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-end">
                <MdOutlineInfo size={18} className="text-muted" />
              </div>
              <div className="d-flex justify-content-start align-items-center">
                <div className="me-3">
                  <span className="mx-1 bg-light p-3 rounded-circle">
                    <MdOutlinePayment size={22} className="mb-1" />
                  </span>
                </div>
                <div>
                  <p className="text-muted mb-0">Total sales</p>
                  <h1 className="h2">&#8373; 500</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-12">
        <div className="row">
          <div className="col-md-6 mb-3">
            <div className="card">
              <div className="card-body p-md-4">
                <h5 className="">Monthly sales</h5>
                <BarChart />
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <div className="card">
              <div className="card-body p-md-4">
                <h5 className="mb-4">Items Selling</h5>
                <div className="d-flex justify-content-center w-75 mx-md-auto">
                  <PieChart />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-12">
        <div className="row">
          <div className="col-md-6 mb-3">
            <div className="card">
              <div className="card-body p-md-4">
                <h5 className="">Reviews</h5>
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
          <div className="col-md-6 mb-3">
            <div className="card">
              <div className="card-body p-md-4">
                <h5 className="">Ratings</h5>
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
        </div>
      </div>
    </>
  );
}

export default SalesPage;
