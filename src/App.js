import { useState } from 'react';
const initialItems = [
  { id: 1, description: 'Passports', quantity: 2, packed: true },
  { id: 2, description: 'Socks', quantity: 12, packed: false },
  { id: 3, description: 'candies', quantity: 10, packed: false },
];
export default function App() {
  const [items, setItems] = useState([]); //initial value should be array type b/c we are storing the items in array. so when we open up for first time we dont won't any items so it shows empty aray. to render the list items is by packing list compoent so we need the item states inside the packing list comp but as form and packing list are sibling so we can pass as a props and we know data flow only down the tree so we put this state not inside the form but inside the app(closest parent comp) b/c app is a parent comp

  function handleAddItems(item) {
    setItems((items) => [...items, item]); //new state depend on current state to update the item array. as we know react is immutable so everytine it will create a new array and add the new item onto it
  } //receive a new item object which it will then add to items array. so we use spread operator to use retrive previous items + add current items
  return (
    <div className="App">
      <Logo />
      <Form onAddItems={handleAddItems} />
      {/* here we have pass handleadditems fucntion as a props */}
      {/* And now let's take care here of this handleAddItems function. So actually, I will grab this entire function  from form compponent to app comp And so now, all we have to do in order to enable the form to update the state is to pass in this handleAddItems function. So, let's do that. Let's create a new prop and kind of a convention is to call this now onAddItems, handleAddItems.And then here, let's accept that. onAddItems. And finally, here we now need to call, of course, the function with this prop. */}
      <PackingList items={items} />
      {/* items is props and items is the array  */}
      <Stats />
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

function PackingList({ items }) {
  //accept the props from app parent comp to child. so now we are using items state in our jsx for render on ui
  return (
    <div className="list">
      <ul className="list">
        {items.map((item) => (
          <Item item={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
}

function Item({ item }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: 'line-through' } : {}}>
        {item.quantity} &nbsp;
        {item.description}
      </span>
      <button>❌</button>
    </li>
  );
}
function Stats() {
  return (
    <footer className="stats">
      {' '}
      <em>You have X item on your list. and you already packed X </em>
    </footer>
  );
}
