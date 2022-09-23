import React from 'react'
import Link from "next/link"

type DataProps = {
    data: { _id: string; status: string, name: string }[],
}

function OrderRow(props: DataProps) {
    return (
        <>
            {props.data.map((item, index) => {
                const {_id, status, name} = item
                return (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td className="text-nowrap">{name}</td>
                        <td className="text-nowrap">{status}</td>
                        <td className="text-nowrap"><Link href={`/orders/${item?._id}`}>
                            <a className="text-decoration-none">View</a></Link>
                        </td>
                    </tr>
                )
            })}
        </>
    )
}

export default OrderRow