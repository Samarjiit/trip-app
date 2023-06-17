import { useState } from 'react';
export default function Form({ onAddItems }) {
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
