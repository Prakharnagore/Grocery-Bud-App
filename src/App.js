import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";
// import { FaCentercode } from "react-icons/fa";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
};
function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, "danger", "Please Enter Value");
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName("");
      setIsEditing(false);
      setEditID(null);
      showAlert(true, "success", "Item Edited");
    } else {
      showAlert(true, "success", "Item Added");
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName("");
    }
  };

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  const clearList = () => {
    showAlert(true, "danger", "emptyList");
    setList([]);
  };
  const deletItem = (id) => {
    if (isEditing) {
      setIsEditing(false);
    }
    showAlert(true, "danger", "Item Removed");
    const newList = list.filter((item) => item.id !== id);
    setList(newList);
  };

  const editItem = (id) => {
    setIsEditing(true);
    setEditID(id);
    const specificItem = list.find((item) => item.id === id);
    setName(specificItem.title);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      showAlert();
    }, 3000);
    return () => clearTimeout(timeout);
  }, [alert]);

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <section className="section-center">
      <form action="" className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} />}
        <h3>Grocery Bud</h3>
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            placeholder="e.g. bananas"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" className="submit-btn">
            {isEditing ? "Edit" : "Submit"}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="grocery-container">
          <List deletItem={deletItem} editItem={editItem} items={list} />
          <button className="clear-btn" onClick={clearList}>
            Clear Items
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
/* "build": "CI= react-scripts build",*/
