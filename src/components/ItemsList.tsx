import { Droppable } from 'react-beautiful-dnd';
import { Item } from '../model';
import SingleItem from './SingleItem';

interface ItemsListProps {
  items: Item[];
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
  boughtItems: Item[];
  setBoughtItems: React.Dispatch<React.SetStateAction<Item[]>>;
}

export default function ItemsList({
  items,
  setItems,
  boughtItems,
  setBoughtItems,
}: ItemsListProps) {
  return (
    <div className="mb-4 mt-10 flex w-10/12 grow items-start justify-between gap-2 overflow-y-auto overflow-x-hidden">
      <Droppable droppableId="itemsToBuy">
        {provided => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="flex-1 self-stretch rounded-md bg-red-200 p-4"
          >
            <h2 className="text-md mb-4 text-center font-bold sm:text-xl">
              To buy
            </h2>
            <ul className="flex flex-1 flex-col gap-3 ">
              {items.map((item, i) => (
                <SingleItem
                  key={item.id}
                  index={i}
                  item={item}
                  items={items}
                  setItems={setItems}
                />
              ))}
              {provided.placeholder}
            </ul>
          </div>
        )}
      </Droppable>
      <Droppable droppableId="itemsBought">
        {provided => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="flex-1 self-stretch rounded-md bg-green-200 p-4"
          >
            <h2 className="text-md mb-4 text-center font-bold sm:text-xl">
              Already bought
            </h2>
            <ul className="flex flex-1 flex-col gap-3 ">
              {boughtItems.map((item, i) => (
                <SingleItem
                  key={item.id}
                  index={i}
                  item={item}
                  items={items}
                  setItems={setBoughtItems}
                />
              ))}
              {provided.placeholder}
            </ul>
          </div>
        )}
      </Droppable>
    </div>
  );
}
