import { useEffect, useState } from 'react';
import Header from './components/Header';
import Input from './components/Input';
import { Item } from './model';
import ItemsList from './components/ItemsList';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

function App() {
  const [item, setItem] = useState<string>('');
  const [items, setItems] = useState<Item[]>(
    JSON.parse(localStorage.getItem('items') as string) || [],
  );
  const [boughtItems, setBoughtItems] = useState<Item[]>(
    JSON.parse(localStorage.getItem('boughtItems') as string) || [],
  );

  console.log(boughtItems);

  useEffect(
    function () {
      localStorage.setItem('items', JSON.stringify(items));
      localStorage.setItem('boughtItems', JSON.stringify(boughtItems));
    },
    [items, boughtItems],
  );

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();

    if (!item.trim()) return;

    setItems(prevItems => [
      ...prevItems,
      {
        id: Date.now(),
        item: item[0].toUpperCase() + item.slice(1),
        isBought: false,
      },
    ]);
    setItem('');
  }

  function onDragEnd(result: DropResult) {
    const { source, destination } = result;

    // Guard clauses:
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    let itemToPlace: Item | undefined;
    const itemsToBuy = items;
    const itemsBought = boughtItems;

    if (source.droppableId === 'itemsToBuy') {
      itemToPlace = itemsToBuy[source.index];
      itemsToBuy.splice(source.index, 1);

      if (destination.droppableId === 'itemsToBuy') {
        itemsToBuy.splice(destination.index, 0, itemToPlace);
      } else {
        itemsBought.splice(destination.index, 0, itemToPlace);
      }
    }

    if (source.droppableId === 'itemsBought') {
      itemToPlace = itemsBought[source.index];
      itemsBought.splice(source.index, 1);

      if (destination.droppableId === 'itemsToBuy') {
        itemsToBuy.splice(destination.index, 0, itemToPlace);
      } else {
        itemsBought.splice(destination.index, 0, itemToPlace);
      }
    }

    setItems(itemsToBuy);
    localStorage.setItem('items', JSON.stringify(itemsToBuy));
    setBoughtItems(itemsBought);
    localStorage.setItem('boughtItems', JSON.stringify(itemsBought));
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex h-screen w-screen flex-col items-center  bg-blue-200">
        <Header />
        <Input item={item} setItem={setItem} handleAdd={handleAdd} />
        <ItemsList
          items={items}
          setItems={setItems}
          boughtItems={boughtItems}
          setBoughtItems={setBoughtItems}
        />
      </div>
    </DragDropContext>
  );
}

export default App;
