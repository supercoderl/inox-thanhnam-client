import "./searchbar.css";
const SearchBar = ({ handleChange }) => {

  return (
    <div className="search-container">
      <input type="text" placeholder="Tìm kiếm sản phẩm..." onChange={handleChange} />
      <ion-icon name="search-outline" className="search-icon"></ion-icon>
    </div>
  );
};

export default SearchBar;
