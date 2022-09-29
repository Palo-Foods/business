import React from 'react'
import Link from "next/link"

type DataProps = {
    data: { _id: string; price: number, name: string }[],
}

function TableRow(props: DataProps) {
    return (
        <>
            {props.data.map((item, index) => (
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td className="text-nowrap">{item?.name}</td>
                    <td className="text-nowrap">{item?.price}</td>
                    <td className="text-nowrap"><Link href={`/products/edit-product/${item?._id}`}>
                      <a className="text-decoration-none">View</a></Link></td>
                  </tr>
           ))}
        </>
    )
}

export default TableRow