import React from "react";

const ListGroup = props => {
  const {
    items,
    textProperty,
    valueProperty,
    selectedItem,
    onFilterItemChange
  } = props;
  return (
    <ul className="list-group">
      {items.map(item => (
        <li
          onClick={() => onFilterItemChange(item)}
          key={item[valueProperty]}
          className={
            item === selectedItem ? "list-group-item active" : "list-group-item"
          }
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "id"
};

export default React.memo(ListGroup);
