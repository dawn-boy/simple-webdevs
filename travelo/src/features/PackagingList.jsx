import Item from "./Item";

function PackagingList({items, setItems, setQuantity, setPackedQty}) {
    return(
        <div className="list">
            {items.length === 0 && <h1 className='poor-txt'>Been rustin here for centuries.. <br /> or has it already been a few eons?</h1>}
            {items.map(item => <Item item={item} setItems={setItems} key={item.id} setQuantity={setQuantity} setPackedQty={setPackedQty} />)}
        </div>
    )
}

export default PackagingList;