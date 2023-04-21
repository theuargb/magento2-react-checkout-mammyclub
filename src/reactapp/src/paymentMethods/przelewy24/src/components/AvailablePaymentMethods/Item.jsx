import { object, func, number } from 'prop-types';
import React from 'react';

function Item({ method, onSelect, selected }) {
  const { id, name, imgUrl } = method;
  return (
    <li
      className={`hover:border-green border-grey border p-1 relative ${
        selected === id ? 'border-green' : ''
      }`}
    >
      <button
        type="button"
        onClick={() => onSelect(id)}
        className="w-full h-full"
      >
        <img
          src={imgUrl}
          alt={name}
          className="aspect-square  block w-full h-full"
          style={{ aspectRatio: '1 / 1' }}
        />
      </button>
    </li>
  );
}

Item.propTypes = {
  method: object.isRequired,
  onSelect: func.isRequired,
  selected: number,
};
Item.defaultProps = {
  selected: 0,
};

export default Item;
