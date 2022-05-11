const ProductTableRow = ({ product, setItem }) => {
  return (
    <tr
      onClick={() => setItem(product)}
      data-bs-toggle="modal"
      data-bs-target="#showModal"
      style={{ cursor: "pointer" }}>
      <td scope="row" className="ps-0">
        {product?.name}
      </td>
      <td className="text-nowrap d-none d-md-table-cell">{product?.price}</td>
      <td className="text-nowrap d-none d-md-table-cell">{product?.category}</td>
    </tr>
  );
};

export default ProductTableRow;
