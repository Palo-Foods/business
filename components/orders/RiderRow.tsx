import React from 'react'

type RiderProps = {
    riders: {
        name: string;
        status: string
    }[],
    setRider: Function
}

function RiderRow(props: RiderProps) {
return (
  <>
            {props?.riders?.map((rider, index) => {
                const {name, status} = rider
                return (
                    <tr key={index}>
                        <td>{name}</td>
                        <td>{status}</td>
                        <td><a type="button" className="btn btn-primary" onClick={() => props.setRider({riderId: rider?.name, name})}>Select</a></td>
                    </tr>
                )
            })}
  </>)
}

export default RiderRow