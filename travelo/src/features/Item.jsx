function Item({item, setItems, setQuantity, setPackedQty}){
    return(
        <li className="item">
            <span className={` item-txt ${item.packed ? "packed" : ""} `}>
                <span className={` item-ct ${item.packed ? "packed" : ""} `}>{item.quantity}</span> {item.description}
            </span>
            <div className="item-btns">
                <button className='item-pack-btn' onClick={() => {
                    item.packed = !item.packed
                    setItems(prev => [...prev])
                    if(item.packed){
                        setQuantity(prev => prev - 1)
                        setPackedQty(prev => prev + 1)
                    } else {
                        setQuantity(prev => prev + 1)
                        setPackedQty(prev => prev - 1)
                    }
                }}>{item.packed ? "Unpack" : 'Pack'}</button>
                <button className='item-rm-btn' onClick={
                    () => {
                        setItems( prev => prev.filter(itm => itm.id !== item.id))
                        setQuantity(prev => prev - 1)
                        if(item.packed) {
                            setPackedQty(prev => prev - 1)
                            setQuantity(prev => prev + 1)
                        }
                    }
                }>Remove</button>
            </div>
        </li>
    )
}

export default Item;