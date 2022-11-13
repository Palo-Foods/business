import React from 'react'
import Link from "next/link"

type DataProps = {
    data: { id: string; price: number, name: string, category: string }[],
}

function TableRow(props: DataProps) {
    console.log(props.data)
    return (
        <>
            {props.data.map((item, index) => (
           
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td className="text-nowrap">{item?.name}</td>
                    <td className="text-nowrap">{item?.price}</td>
                    <td className="text-nowrap">{item?.category}</td>
                    <td className="text-nowrap"><Link href={`/products/edit-product/${item?.id}`}>
                      <a className="text-decoration-none">View</a></Link></td>
                  </tr>
           ))}
        </>
    )
}

export default TableRow