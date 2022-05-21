import { useSessionStorage } from "../hooks/useSession";

const ProductTableRow = ({ product, router }) => {
  const {item} = useSessionStorage("user")
  const handleRoute = () => {
    router.push(`/products/edit-product/${item?.id}/${product?.id}`);
  };

  return (
    <tr onClick={handleRoute} style={{ cursor: "pointer" }}>
      <td scope="row" className="">
        {product?.name}
      </td>
      <td className="text-nowrap d-none d-md-table-cell">Ghc {product?.price}</td>
      <td className="text-nowrap d-none d-md-table-cell">Ghc {product?.discount || 0}</td>
      <td className="text-nowrap d-none d-md-table-cell">
        {product?.category}
      </td>
    </tr>
  );
};

export default ProductTableRow;
