import { useState } from 'react';
import Logo from './Logo'; //Logo can be x could be any name not necessary same
import Form from './Form';
import PackingList from './PackingList';
import Stats from './Stats';
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
