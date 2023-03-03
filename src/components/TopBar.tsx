import { FaPlus } from "react-icons/fa";
import { useState } from "react";

export default function TopBar(props: any) {
  const { search, setSearch } = props;

  const handleSearch = (searchInput: string) => {
    setSearch(searchInput);
    props.searchNotes(searchInput);
  };

  return (
    <>
      <div className="flex justify-center space-x-2 p-5">
        <label className="flex flex-col justify-center items-center">
          <input
            className="input-primary"
            type="text"
            placeholder="Type to search..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </label>
        <button
          type="button"
          className="btn-success"
          onClick={() => props.handleOpenModal(search)}
        >
          <FaPlus /> Add Note
        </button>
      </div>
    </>
  );
}
