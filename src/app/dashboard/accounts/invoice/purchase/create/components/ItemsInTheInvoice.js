"use client";

import userAxios from "@/lib/userbackAxios";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import showCurrency from "@/helper/showCurrency";
import CalculateDiscountedPriceAndGST from "@/helper/CalculateDiscountedPriceAndGST";
function InventoryItem(props) {
    const {item,handleAddNewItem,handleRemoveNewItem}=props;
    const [currentItemQuantity,setCurrentItemQuantity]=useState(0);
    const [currentItemDiscount,setCurrentItemDiscount]=useState(0);
    const [isAdded,setIsAdded]=useState(false);
    const onAddItem=()=>{
        handleAddNewItem({
            ...item,
            itemId:item?.id,
            quantity:currentItemQuantity,
            discount:currentItemDiscount,
            amount:CalculateDiscountedPriceAndGST(item.price||0, item.discount||0, item.gst||0).amount
        })
        setIsAdded(true)
    }
    const onRemoveItem=()=>{
        handleRemoveNewItem(item?.id)
        setIsAdded(false)
    }
    return (
        <li className="p-2 rounded-md grid gap-2 md:grid-cols-4 border border-blue-500">
            <div className="text-xs md:col-span-1 col-span-2">
                <div>{item?.itemName}</div>
                <div>Price: &#8377; {showCurrency(item?.price)}</div>
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-xs font-medium" htmlFor="quantity">Quantity</label>
                <input
                    type="number"
                    className="min-w-4 max-w-24 rounded-md p-1 outline outline-1 outline-neutral-500/60 focus:outline-2 focus:outline-blue-500"
                    id="quantity"
                    value={currentItemQuantity}
                    min={0}
                    onChange={(e)=>setCurrentItemQuantity(parseInt(e.target.value)||"")}
                />
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-xs font-medium" htmlFor="discount">Discount %</label>
                <input
                    type="number"
                    className="min-w-4 max-w-24 rounded-md p-1 outline outline-1 outline-neutral-500/60 focus:outline-2 focus:outline-blue-500"
                    id="discount"
                    value={currentItemDiscount}
                    min={0}
                    onChange={(e)=>setCurrentItemDiscount(parseInt(e.target.value)||"")}
                />
            </div>
            <div className="grid md:place-content-center md:col-span-1 col-span-2">
                {isAdded?
                    <button onClick={onRemoveItem} type="button" className=" bg-red-400 text-neutral-50 rounded-md hover:bg-red-600 p-2 text-2xl">
                        <Icon className="mx-auto" icon="material-symbols:remove" />
                    </button>
                :
                <button onClick={onAddItem} type="button" className=" bg-blue-400 text-neutral-50 rounded-md hover:bg-blue-600 p-2 text-2xl">
                    <Icon className="mx-auto" icon="material-symbols:add" />
                </button>
                }
            </div>
        </li>
    )
}


function ItemsInventory(props) {
    const { data_Items, isInventoryOpen,setInventoryOpen,addedItemsInInvoice,setAddedItemsInInvoice}=props;
    const handleAddNewItem = (newItem)=>{
        setAddedItemsInInvoice((prev)=>{
            const filteredItems = prev.filter((item) => {
                return item.itemId !== newItem.itemId
            });
            return [...filteredItems,newItem];
        });
    }
    const handleRemoveNewItem = (id)=>{
        setAddedItemsInInvoice((prev)=>{
            const filteredItems = prev.filter((item) => {
                return item.itemId !== id
            })
            return [...filteredItems];
        })
    }
    return (
		<>
			<div className={`${ isInventoryOpen ? "translate-x-[0%]" : "translate-x-full" } transition-transform duration-200 pt-20 pb-20 fixed top-0 right-0 bottom-0 z-40 h-screen bg-neutral-50`}
			>
				<div className="p-2 border-b-2 border-b-blue-500 flex gap-2">
					<button
						onClick={() => setInventoryOpen(false)}
						type="button"
						className="btn-primary"
					>
						<Icon icon="material-symbols:close" />
					</button>
				</div>
				<ul className="p-2 flex flex-col gap-2 h-full overflow-y-auto">
					{data_Items?.items.map((item, index) => (
						<InventoryItem 
                            key={item.id}
                            item={item}
                            handleAddNewItem={handleAddNewItem}
                            handleRemoveNewItem={handleRemoveNewItem}
                        />

					))}
				</ul>
                <div className="text-xl px-1 border-t-2 border-t-blue-500 flex gap-2">
                    <div>Total Items:</div>
                    <div>{addedItemsInInvoice.length}</div>
                </div>
			</div>
			<div
				onClick={() => setInventoryOpen(false)}
				className={` ${
					isInventoryOpen
						? "fixed inset-[0_0_0_0] z-30 bg-neutral-950/20"
						: "hidden"
				}`}
			></div>
		</>
	);
}
function ItemsTable(props) {
    const {addedItemsInInvoice}=props;
	return (
		<div className="p-2">
            <div className=" w-full overflow-x-scroll p-2 rounded-md min-h-60 border-2 shadow-sm shadow-blue-600">
                <table>
                    <thead>
                        <tr className="[&>th]:border-x text-sm bg-blue-400 text-neutral-50">
                            <th className="text-start p-1">S.No</th>
                            <th className="text-start p-1">Item Name</th>
                            <th className="text-start p-1">HSN Code</th>
                            <th className="text-start p-1">Quantity</th>
                            <th className="text-start p-1">Price</th>
                            <th className="text-start p-1">Discount</th>
                            <th className="text-start p-1">Unit</th>
                            <th className="text-start p-1">GST</th>
                            <th className="text-start p-1">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {addedItemsInInvoice?.map((item,index)=>(
                            <tr className="  border-y [&>td]:border-x [&>td]:px-2 text-xs" key={item.id}>
                                <td>{index+1}</td>
                                <td>{item.itemName}</td>
                                <td>{item.hsnCode}</td>
                                <td>{item.quantity}</td>
                                <td>&#8377; {showCurrency(item.price)}</td>
                                <td>{item.discount}%</td>
                                <td>{item.unit}</td>
                                <td>{item.gst}</td>
                                <td>{showCurrency(item.amount)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {addedItemsInInvoice?.length=== 0 ? (
                <div className=" flex flex-col items-center gap-4 justify-center mb-2 max-w-6xl mx-auto">
                    <div>
                        <Icon className="w-40 h-24 opacity-5 mx-auto" icon="ph:files-light" />
                        <p className="text-center">No Record Found</p>
                    </div>
                </div>
                ):""}
            </div>
		</div>
	);
}
export default function ItemsInTheInvoice(props) {
    const {addedItemsInInvoice,setAddedItemsInInvoice} = props;
    const [isInventoryOpen, setInventoryOpen] = useState(false);
    const [data_Items, setItemsData] = useState(null);
	const [isLoading_Items, setLoading_Items] = useState(false);
	const [error_Items, setError_Items] = useState(null);
    const getItems = async () => {
        try {
            setLoading_Items(true);
            const itemsResponse = await userAxios.get("/invoice/items");
            setItemsData(itemsResponse.data);
        } catch (error) {
            setError_Items(error);
        } finally {
            setLoading_Items(false);
        }
    };
    useEffect(() => {
		getItems();
	}, []);
    return (
		<div className="md:col-span-2">
			<div className="uppercase font-medium text-xl text-gray-800 pl-2 border-l-4 border-l-blue-600">
				items in the invoice
			</div>
			<ItemsTable addedItemsInInvoice={addedItemsInInvoice} />
            <ItemsInventory
                data_Items={data_Items}
                isInventoryOpen={isInventoryOpen}
                setInventoryOpen={setInventoryOpen}
                addedItemsInInvoice={addedItemsInInvoice}
                setAddedItemsInInvoice={setAddedItemsInInvoice}
            />
			<div>
				<button
					type="button"
					onClick={()=>setInventoryOpen(true)}
					className="bg-blue-400 text-neutral-50 rounded-md hover:bg-blue-600 p-2 "
				>
					Select Items From Inventory
				</button>
			</div>
		</div>
	);
}
