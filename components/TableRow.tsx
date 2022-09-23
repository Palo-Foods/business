import React from 'react'
import Link from "next/link"

type DataProps = {
    data: { _id: string; email: string; phone: string, name: string }[],
    type: string
}

function TableRow(props: DataProps) {
    return (
        <>
            {props.data.map((item, index) => (
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td className="text-nowrap">{item?.name}</td>
                    <td className="text-nowrap">{item?.email}</td>
                    <td className="text-nowrap">{item?.phone}</td>
                    <td className="text-nowrap"><Link href={`/${props?.type}/edit-${props.type}/${item?._id}`}>
                      <a className="text-decoration-none">View</a></Link></td>
                  </tr>
           ))}
        </>
    )
}

export default TableRow