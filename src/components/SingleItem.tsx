import { useEffect, useRef, useState } from 'react';
import { Item } from '../model';
import { AiOutlineCheck, AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { Draggable } from 'react-beautiful-dnd';

type SingleItemProps = {
  item: Item;
  items: Item[];
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
  index: number;
};

export default function SingleItem({
  item,

  setItems,
  index,
}: SingleItemProps) {
  const [isEditting, setIsEditting] = useState<boolean>(false);
  const [itemText, setItemText] = useState<string>(item.item);

  const inputRef = useRef<HTMLInputElement>(null);

  function handleDone(id: number) {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, isBought: !item.isBought } : item,
      ),
    );
  }

  function handleEdit(e: React.FormEvent, id: number) {
    e.preventDefault();
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, item: itemText } : item,
      ),
    );
    setIsEditting(false);
  }

  function handleDelete(id: number) {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  }

  useEffect(
    function () {
      if (isEditting) inputRef.current?.focus();
    },
    [isEditting],
  );

  return (
    <Draggable draggableId={item.id.toString()} index={index}>
      {provided => (
        <li
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className=" rounded-md bg-[url('https://img.freepik.com/free-photo/crumpled-yellow-paper-background-close-up_60487-2390.jpg?size=626&ext=jpg')] p-2 duration-300 hover:scale-105 hover:shadow-md sm:p-3"
        >
          <form
            className="flex items-center justify-between"
            onSubmit={e => handleEdit(e, item.id)}
          >
            {isEditting ? (
              <input
                ref={inputRef}
                type="text"
                className="p-1 text-sm focus:outline-none"
                value={itemText}
                onChange={e => setItemText(e.target.value)}
              />
            ) : (
              <span
                className={`text-sm ${item.isBought ? 'line-through' : ''}`}
              >
                {item.item}
              </span>
            )}
            <div className="flex items-center gap-1 sm:gap-2">
              <span
                className="cursor-pointer p-1"
                onClick={() => {
                  if (!isEditting && !item.isBought)
                    setIsEditting(edit => !edit);
                }}
              >
                <AiOutlineEdit />
              </span>
              <span
                className="cursor-pointer p-1"
                onClick={() => handleDelete(item.id)}
              >
                {' '}
                <AiOutlineDelete />
              </span>
              <span
                className="cursor-pointer p-1"
                onClick={() => handleDone(item.id)}
              >
                <AiOutlineCheck />
              </span>
            </div>
          </form>
        </li>
      )}
    </Draggable>
  );
}
