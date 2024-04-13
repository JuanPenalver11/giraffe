import React from "react";
//helper
import { categories } from "../../helpers/categories";

const Filter = ({ handleCategory }) => {
  return (
    <div className="dropdown">
      <div
        className="btn btn-secondary dropdown-toggle"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        style={{
          background: "rgb(243, 159, 149)",
          border: "1px solid black",
          color: "black",
        }}
      >
        Filter
      </div>

      <ul
        className="dropdown-menu"
        style={{
          background: "rgb(222, 222, 222)",
          fontFamily: "Rampart One",
          color: "rgb(243, 124, 111)",
        }}
      >
        {categories.map((category, index) => {
          return (
            <button
              className="btn btn-filter"
              key={index}
              onClick={() => handleCategory(category.name)}
            >
              {category.name}
              <span>
                <img
                  src={category.icon}
                  alt={category.name}
                  style={{ width: "25px" }}
                />
              </span>
            </button>
          );
        })}
      </ul>
    </div>
  );
};

export default Filter;
