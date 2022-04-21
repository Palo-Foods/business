import React from "react"
import {PDFDownloadLink} from "@react-pdf/renderer";
import Invoice from "./Invoice";

const PDFView = () => {
  const order = {
    orderId: "#7464",
    date: "2th April, 2021",
    orderStatus: "pending",
    products: [
      { id: 1, name: "item 1", qty: 1, price: 20 },
      { id: 2, name: "item 2", qty: 1, price: 30 },
    ],
    shippingAmount: 10,
    subTotal: 50
  };
  return (
    <>
      <PDFDownloadLink
        document={<Invoice order={order} />
        }
        fileName="invoice.pdf"
        className="btn btn-outline-primary">
          Download PDF
        </PDFDownloadLink>
    </>
  );
}

export default PDFView;