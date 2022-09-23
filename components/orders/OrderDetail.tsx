import React from 'react'
import ApproveOrderModal from '../modals/ApproveOrderModal';
import AssignRiderToOrderModal from '../modals/AssignRiderToOrderModal';


type OrderDetailProps = {
  url: string,
  order: {
    _id: string,
    orderId: string,
    shop: { name: string, id: string, phone: string },
    items: { name: string; price: number; qty: number }[],
    deliveryPrice: number,
    user: { name: string, id: string, phone: string },
    createdAt: string
  }
}

function OrderDetail(props: OrderDetailProps) {
  return (
    <>
    <div className="card">
      <div className='card-body'>
        <div>
          <h2 className='text-muted'>Items</h2>
          <ul>
            {props.order?.items?.map((item, index) => {
            const {name, price, qty} = item
            return (
              <li key={index}>
                <span>{name}</span>
                <span className='mx-3'>{qty}</span>
                <span>{price}</span>
              </li>
              )
            })}
            </ul>
        </div>
        <div>
          <h2 className='text-muted'>Shop</h2>
          <h3><span className='text-muted'>Name:</span><span className="ms-4">{props?.order?.shop?.name}</span></h3>
          <h3><span className='text-muted'>Phone:</span><span className="ms-4">{props?.order?.shop?.phone}</span></h3>
        </div>
         <div className='my-3'>
          <h2 className='text-muted'>User</h2>
          <h3><span className='text-muted'>Name:</span><span className="ms-4">{props?.order?.user?.name}</span></h3>
          <h3><span className='text-muted'>Phone:</span><span className="ms-4">{props?.order?.user?.phone}</span></h3>
        </div>
      </div>
      </div>
      <ApproveOrderModal orderId={props.order._id} url={props?.url} />
      <AssignRiderToOrderModal orderId={props.order._id} url={props?.url} />
    </>
  )
}

export default OrderDetail