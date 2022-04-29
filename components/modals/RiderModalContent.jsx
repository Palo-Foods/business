import AddRiderForm from "../forms/AddRiderForm";

const RiderModalContent = ({ edit, item }) => {
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
      {edit && <AddRiderForm rider={item} edit={edit} />}
    </>
  );
};

export default RiderModalContent;
