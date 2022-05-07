const BusinessTableRow = ({ business: object, setItem }) => {
  return (
    <tr
      onClick={() => setItem(business)}
      data-bs-toggle="modal"
      data-bs-target="#showModal"
      style={{ cursor: "pointer" }}>
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
    </tr>
  );
};

export default BusinessTableRow;
