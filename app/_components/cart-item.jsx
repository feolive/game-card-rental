import MinusIcon from "@/app/_icons/MinusIcon";
import PlusIcon from "@/app/_icons/PlusIcon";
import { useContext } from "react";
import { CartContext } from "@/app/_utils/cart-context";

export default function CartItem({item}) {

  const { addItem, subItem } = useContext(CartContext);

  return (
    <>
      <li className="list-row flex justify-between items-center hover:bg-[var(--color-hover-highlight)]">
        <div className="flex justify-center items-center gap-3">
          <img
            className="size-12 rounded-box object-cover"
            src={item?.img || "/covers/default-card.png"}
          />
          <div className="flex flex-col justify-center items-start gap-1">
            <div className="text-xs uppercase font-semibold line-clamp-1" title={item?.name || "no name"}>{item?.name || "no name"}</div>
            <div className="text-xs uppercase font-semibold opacity-60 line-clamp-1" title={item?.description || "--"}>{item?.description || "--"}</div>
          </div>  
        </div>
        <div className="text-xs font-semibold opacity-60">
          ${item?.price || 0}/each
        </div>
        <div className="text-xs font-semibold">
          cost: ${item?.price ? item.price * item.quantity : "0"}
        </div>
        <div className="flex justify-center items-center gap-1.5">
          <button className="btn btn-square btn-ghost" onClick={() => subItem(item)}>
            <MinusIcon color="var(--color-info)" />
          </button>
          <input type="number" className="input input-xs w-10 text-center" value={item?.quantity || 0} readOnly min={0} max={0}/>
          <button className="btn btn-square btn-ghost" onClick={() => addItem(item)}>
          <PlusIcon color="var(--color-secondary)" />
        </button>
        </div>
      </li>
    </>
  );
}
