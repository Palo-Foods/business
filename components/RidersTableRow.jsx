import { MdDelete } from "react-icons/md";

const RiderTableRow = ({ rider, setItem }) => {
  return (
    <tr
      onClick={() => setItem(rider)}
      data-bs-toggle="modal"
      data-bs-target="#showModal"
      style={{ cursor: "pointer" }}>
      <td scope="row" className="ps-0">
        {rider?.name}
      </td>
      <td className="text-nowrap d-none d-md-table-cell">{rider?.fullName}</td>
      <td className="text-nowrap d-none d-md-table-cell">{rider?.phone}</td>
      <td className="text-nowrap d-none d-md-table-cell">{rider?.region}</td>
    </tr>
  );
};

export default RiderTableRow;
