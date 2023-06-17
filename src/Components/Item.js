export default function Item({ item, onDeleteItem, onToggleItem }) {
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
