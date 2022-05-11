import AddProductForm from "../forms/AddProduct";

const ProductModalContent = ({ edit, item }) => {
  return (
    <>
      {!edit && (
        <div>
          <h6 className="d-flex justify-content-between mb-3">
            Product name: <span className="fw-normal">{item?.name}</span>
          </h6>
          <h6 className="d-flex justify-content-between mb-3">
            Category: <span className="fw-normal">{item?.type}</span>
          </h6>
          <h6 className="d-flex justify-content-between mb-3">
            Price: <span className="fw-normal">{item?.price}</span>
          </h6>
        </div>
      )}
      {edit && <AddProductForm product={item} edit={edit} />}
    </>
  );
};

export default ProductModalContent;
