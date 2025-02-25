import ItemList from "./components/ItemList";
import AddItemForm from "./components/AddItemForm";

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-5">
      <AddItemForm />
      <ItemList />
    </div>
  );
}

export default App;
