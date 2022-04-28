import { MdDelete, MdModeEditOutline } from "react-icons/md";

const RiderTableRow = ({ rider, handleEditRider, setItem }) => {
  return (
    <tr>
      <td scope="row" className="ps-0">
        {rider?.name}
      </td>
      <td className="text-nowrap d-none d-md-table-cell">{rider?.fullName}</td>
      <td className="text-nowrap d-none d-md-table-cell">{rider?.phone}</td>
      <td className="text-nowrap d-none d-md-table-cell">{rider?.region}</td>
      <td className="text-nowrap d-none d-md-table-cell"></td>
      <td>
        <a
          type="button"
          onClick={() => handleEditRider(rider)}
          className="me-md-2">
          <MdModeEditOutline size={20} />
        </a>
        <a
          type="button"
          className="ms-3"
          onClick={() => setItem(rider)}
          data-bs-toggle="modal"
          data-bs-target="#deleteModal">
          <MdDelete className="text-danger" size={20} />
        </a>
      </td>
    </tr>
  );
};

export default RiderTableRow;
