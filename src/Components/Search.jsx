import React, { useState } from "react";

function Search({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <form className="search" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search books..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)} // Update the query state as the user types
      />
      <button type="submit">Search</button>
      {/* Submit button to trigger the search */}
    </form>
  );
}
export default Search;
