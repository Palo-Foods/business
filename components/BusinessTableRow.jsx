import { MdAdd, MdDelete, MdModeEditOutline } from "react-icons/md";

const BusinessTableRow = ({ business, handleEditBusiness, setItem }) => {
  return (
    <tr>
      <td scope="row" className="ps-0">
        {business?.name}
      </td>
      <td className="text-nowrap d-none d-md-table-cell">
        {business?.fullName}
      </td>
      <td className="text-nowrap d-none d-md-table-cell">{business?.phone}</td>
      <td className="text-nowrap d-none d-md-table-cell">{business?.region}</td>
      <td className="text-nowrap d-none d-md-table-cell">
        {business?.location}
      </td>
      <td>
        <a
          type="button"
          onClick={() => handleEditBusiness(business)}
          className="me-md-2">
          <MdModeEditOutline size={20} />
        </a>
        <a
          type="button"
          className="ms-3"
          onClick={() => setItem(business)}
          data-bs-toggle="modal"
          data-bs-target="#deleteModal">
          <MdDelete className="text-danger" size={20} />
        </a>
      </td>
    </tr>
  );
};

export default BusinessTableRow;
