import { useState } from 'react';
import Item from './Item';

export default function PackingList({
  items,
  onDeleteItem,
  onToggleItem,
  onClearList,
}) {
  //accept the props from app parent comp to child. so now we are using items state in our jsx for render on ui
  //to sort the elements we require control elements and states
  const [sortBy, setSortBy] = useState('input');
  let sortedItems; //derived state from sortby state
  if (sortBy === 'input') sortedItems = items; // no change in order
  if (sortBy === 'description')
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));

  if (sortBy === 'packed')
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">sort by input order</option>
          <option value="description">sort by description</option>

          <option value="packed">sort by packed</option>
        </select>
        <button onClick={onClearList}>Clear list </button>
      </div>
    </div>
  );
}
