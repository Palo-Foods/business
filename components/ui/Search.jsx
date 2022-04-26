import React from "react";
import { MdSearch } from "react-icons/md";

function Search({ items, keyword, setKeyword }) {
  const handleSearchChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };

  return (
    <>
      <form className="form-inline my-2 my-lg-0">
        <div className="input-group">
          <div className="input-group-text border-end-0 bg-white">
            <MdSearch size={24} />
          </div>
          <input
            type="search"
            value={keyword}
            onChange={handleSearchChange}
            placeholder="Search..."
            aria-label="Search"
            disabled={!items?.length === 0}
            className="form-control border-start-0"
          />
        </div>
      </form>
    </>
  );
}

export default Search;
