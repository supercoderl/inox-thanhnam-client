import Select from 'react-select';
import { useEffect, useState } from 'react';
import ApiService from '../services/apiService';

const customStyles = {
    control: (provided) => ({
        ...provided,
        backgroundColor: "#d05a3ccf",
        color: "white",
        borderRadius: "5px",
        border: "none",
        boxShadow: "none",
        width: "200px",
        height: "40px",
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? "#d05a3ccf" : "white",
        color: state.isSelected ? "white" : "#d05a3ccf",
        "&:hover": {
            backgroundColor: "#d05a3ccf",
            color: "white",
        },
    }),
    singleValue: (provided) => ({
        ...provided,
        color: "white",
    }),
};

const FilterSelect = ({ handleChange }) => {

    const [categories, setCategories] = useState([
        {
            value: -1,
            label: "Tất cả"
        }
    ]);

    const getCategories = async () => {
        await ApiService.get("Category/categories").then((res) => {
            const result = res.data;
            if (!result) return;
            else if (result.success && result.data && result.data.length > 0) {
                setCategories((prevCategories => [...prevCategories, ...result.data.map((c) => {
                    return {
                        value: c.categoryID,
                        label: c.name
                    };
                })]));
            }
        })
    }

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <Select
            options={categories}
            defaultValue={{ value: "", label: "Lọc sản phẩm" }}
            styles={customStyles}
            onChange={handleChange}
        />
    );
};

export default FilterSelect;
