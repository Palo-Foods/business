import AddBusinessForm from "../forms/AddBusinessForm";

const BusinessModalContent = ({edit, item}) => {
  return (
    <>
      {!edit && (
        <div>
          <h6 className="d-flex justify-content-between mb-3">
            Business name: <span className="fw-normal">{item?.name}</span>
          </h6>
          <h6 className="d-flex justify-content-between mb-3">
            Region: <span className="fw-normal">{item?.region}</span>
          </h6>
          <h6 className="d-flex justify-content-between mb-3">
            Region: <span className="fw-normal">{item?.region}</span>
          </h6>
        </div>
      )}
      {edit && <AddBusinessForm business={item} edit={edit} />}
    </>
  );
};

export default BusinessModalContent;
