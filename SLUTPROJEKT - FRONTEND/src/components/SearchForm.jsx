import React, { useState } from 'react';

function SearchForm({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    onSearch(searchTerm);
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Sök efter en produkt"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Sök</button>
    </div>
  );
}

export default SearchForm;
