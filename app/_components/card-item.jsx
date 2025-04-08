import PlusIcon from "@/app/_icons/PlusIcon";
import MinusIcon from "@/app/_icons/MinusIcon";
import { useContext, useState, useEffect } from "react";
import { CartContext } from "@/app/_utils/cart-context";

export default function CardItem({ item }) {

  const { items, addItem, subItem } = useContext(CartContext);
  const [quantity, setQuantity] = useState(item?.quantity || 0);

  useEffect(() => {
    setQuantity(item?.quantity);
  }, [item.quantity]);

  const handleAdd = () => {
    if(items.find(i => i.id === item.id)){
      addItem(item);
      return;
    }
    item.new = true;
    addItem(item);
  };

  return (
    <div className="card bg-base-100 w-[12em] h-[14em] 2xl:w-[14em] 2xl:h-[16em] shadow-md shadow-slate-500 hover:translate-y-[-5px] transition-transform duration-300">
      <figure>
        <img
          className="w-full h-full object-cover"
          src={item?.img || "/covers/default-card.png"}
          alt={item?.name || "game card cover"}
        />
      </figure>
      <div className="card-body gap-1">
        <div className="flex justify-between items-start -mt-3">
          <p className="card-title w-1/2 text-xs font-bold line-clamp-1" title={item?.name || "no name"}>
            {item?.name || "no name"}
          </p>
          <div className="flex flex-col justify-start items-end gap-1">
            <p className="text-base-content stat-value text-xs">
              ${item?.price || "0"}
            </p>
            <div className="badge badge-outline badge-primary badge-xs">
              Stock:<span className="text-xs">{item?.inventory || "0"}</span>
            </div>
          </div>
        </div>

        <p
          className="text-base-content text-xs line-clamp-2"
          title={item?.description || "--"}
        >
          {item?.description ||
            "--"}
        </p>
        <div className="card-actions justify-start items-center gap-1 mt-1 -mb-3">
          <button className="btn btn-primary btn-xs rounded-full" onClick={() => handleAdd()}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
