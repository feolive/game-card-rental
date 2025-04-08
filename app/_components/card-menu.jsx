import CardItem from "./card-item";
import { CartContext } from "@/app/_utils/cart-context";
import { useContext,useEffect,useState } from "react";
import tryCatch from "@/app/_utils/try-catch";

export default function CardMenu() {

  const [listItems, setListItems] = useState([]);
  const [pageNum, setPageNum] = useState(1);

  const { items,setItems, addItem, clearCart } = useContext(CartContext);

  const setPageNumber = (num) => {
    if(num < 1) return;
    setPageNum(num);
  };

  useEffect(() => {
    async function fetchItems() {
      const [data, error] = await tryCatch(async () => await fetch(`/api/rental/items/${pageNum-1}`));
      if(error){
        console.error(error);
        return;
      }
      if(!data){
        return;
      }
      const itemData = await data.json();
      setListItems(itemData);
    }
    fetchItems();
  },[pageNum]);


  return (
    <div className="w-full h-[80em] relative flex flex-col gap-3">
      <div className="flex justify-start items-center gap-4">
        <label className="input">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input type="search" className="grow" placeholder="Search" />
          <kbd className="kbd kbd-md">↩︎</kbd>
        </label>
        <div className="w-2/3 flex justify-start items-center gap-2 overflow-x-auto overflow-y-hidden">
          <label className="btn btn-soft btn-info p-2 rounded-lg">
            <input type="checkbox" className="checkbox checkbox-info checkbox-xs" />
            <span className="text-xs ml-1">RPG</span>
          </label>
          <label className="btn btn-soft btn-info p-2 rounded-lg">
            <input type="checkbox" className="checkbox checkbox-info checkbox-xs" />
            <span className="text-xs ml-1">Action</span>
          </label>
          <label className="btn btn-soft btn-info p-2 rounded-lg">
            <input type="checkbox" className="checkbox checkbox-info checkbox-xs" />
            <span className="text-xs ml-1">Strategy</span>
          </label>
        </div>
      </div>
      <section className="grid grid-cols-4 grid-rows-2 h-5/6 self-center gap-10">
      {listItems && listItems.map((item) => (
        <CardItem key={item.id} item={item} />
      ))}
      </section>
      <div className="flex justify-center items-center ">
        <div className="join grid grid-cols-2">
          <button className="join-item btn btn-outline w-18 rounded-l-full" onClick={() => setPageNumber(prev => prev - 1)}>«</button>
          <button className="join-item btn btn-outline w-18 rounded-r-full" onClick={() => setPageNumber(prev => prev + 1)}>»</button>
        </div>
      </div>
    </div>
  );
}
