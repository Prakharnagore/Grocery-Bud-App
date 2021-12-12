import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
const List = ({ items, deletItem, editItem }) => {
  return (
    <div className="grocery-list">
      {items.map((item) => {
        const { id, title } = item;
        return (
          <article key={id} className="grocery-item">
            <p className="title">{title}</p>
            <div className="btn-container">
              <button
                className="edit-btn"
                onClick={() => editItem(id)}
                type="button"
              >
                <FaEdit />
              </button>
              <button
                className="delete-btn"
                type="button"
                onClick={() => deletItem(id)}
              >
                <FaTrash />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default List;
