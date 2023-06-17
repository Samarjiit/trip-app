import { useState } from 'react';
/*const initialItems = [
  { id: 1, description: 'Passports', quantity: 2, packed: true },
  { id: 2, description: 'Socks', quantity: 12, packed: false },
  { id: 3, description: 'candies', quantity: 10, packed: false },
];*/

export default function App() {
  const [items, setItems] = useState([]); //initial value should be array type b/c we are storing the items in array. so when we open up for first time we dont won't any items so it shows empty aray. to render the list items is by packing list compoent so we need the item states inside the packing list comp but as form and packing list are sibling so we can pass as a props and we know data flow only down the tree so we put this state not inside the form but inside the app(closest parent comp) b/c app is a parent comp

  function handleDeleteItem(id) {
    //And so the click to delete, so on each of these crosses, will happen inside of the item. But the state actually lives in the app. So in the parent component. And therefore this is another case of Child-To-Parent Communication. So let's now go back here to our app which is where our state lives. And then all we're going to do is to create a new function right here called handleDeleteItem.
    setItems((items) => items.filter((item) => item.id !== id)); //if id==item.id then that item will not be a part of array
  }

  function handleAddItems(item) {
    setItems((items) => [...items, item]); //new state depend on current state to update the item array. as we know react is immutable so everytine it will create a new array and add the new item onto it
  } //receive a new item object which it will then add to items array. so we use spread operator to use retrive previous items + add current items

  function handleToggleItem(id) {
    //to update the items array. only toggle packed property.we will loop over the entire array and upate using map
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleClearSet() {
    const confirm = window.confirm(
      'are you sure you want to delete all items?'
    );
    if (confirm) setItems([]);
  }
  return (
    <div className="App">
      <Logo />
      <Form onAddItems={handleAddItems} />
      {/* here we have pass handleadditems fucntion as a props */}
      {/* And now let's take care here of this handleAddItems function. So actually, I will grab this entire function  from form compponent to app comp And so now, all we have to do in order to enable the form to update the state is to pass in this handleAddItems function. So, let's do that. Let's create a new prop and kind of a convention is to call this now onAddItems, handleAddItems.And then here, let's accept that. onAddItems. And finally, here we now need to call, of course, the function with this prop. */}
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
        onClearList={handleClearSet} //pass as props
      />
      {/* items is props and items is the array  */}
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>👍Trip App👜</h1>;
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault(); //prevent from reload if website
    if (!description) return; //nothing happen b/c no desc is there after submit
    //final step after react controll the states of form
    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem);
    onAddItems(newItem);
    //once submit all the states value goes to initial state
    setDescription('');
    setQuantity(1);
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>what did you need for your trip!!😊</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({ items, onDeleteItem, onToggleItem, onClearList }) {
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
      <ul className="list">
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

function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li>
      <input
        type="checkbox" //transform this ele as control element :means that the element has the value defined by some state and it also has an event handler which listens for the change and updates the state accordingly.
        value={item.packed} //true or false
        onChange={() => onToggleItem(item.id)} //happen each time when we click to check box.now we know when item to toggle
      />
      <span style={item.packed ? { textDecoration: 'line-through' } : {}}>
        {item.quantity} &nbsp;
        {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>{' '}
      {/* 
Now if we use only,onClick={onDeleteItem}, then this is not going to work. And so you see that nothing happens. Because what we get in here instead of an ID, is this event. So what's going on here? Well, when we simply specify the function here like this, then React will call the function as the event happens, and it does so by passing in the event object. So we actually used this to our advantage in the form, so right here where we then received the event. But right now we do not want to receive the event, but instead the ID of the current item. And so we need to create a new function here, and then we pass in the current ID. So item.id. And once more, it's really important that you don't forget this. Because otherwise React will just immediately call the function which is not what we want. We want a function here really, so that React can then call this function only when the event happens.
 */}
    </li>
  );
}
function Stats({ items }) {
  if (!items.length)
    return (
      <p className="stats">
        <em>Start adding some items to your packing list 🚀</em>
      </p>
    );

  const numItems = items.length; //dervied state
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);
  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? 'You got everything! Ready to go ✈️'
          : ` 💼 You have ${numItems} items on your list, and you already packed ${numPacked} (${percentage}%)`}
      </em>
    </footer>
  );
}
