import './styles.css'
import { useState } from 'react';

function Logo(){
    return(
        <h1 className="logo">Travelo.</h1>
    )
}

const isAvailable = (items, description) => {
    return items.some(
        item => item.description === description
    )
}

function Form({items, setItems, setTotal}){

    const [ quantity, setQuantity ] = useState(1)
    const [ description, setDescription ] = useState("")

    return(
        <div className="add-form">
            <div className="title">
                <h3>What do you need for your trip?</h3>
            </div>
            <div className="form">
                <select id="select-input" onChange={e =>
                   setQuantity(Number(e.target.value))

                }>
                    {Array.from(
                        { length: 100},
                        ( _, i ) => i + 1
                    ).map(i => <option key={i} value={i}>{i}</option>)}
                </select>
                <input type="text" id="txt-input" placeholder="Add item" onChange={e =>
                    setDescription(e.target.value)
                } />
                <button onClick={
                    () => {
                        if(quantity === 1 && description === "") return alert("Please add an item")
                        if(isAvailable(items, description)) return alert("This item is already on your list")
                        setItems([...items, {
                            id: Date.now(),
                            quantity,
                            description,
                            packed: false,
                        }])
                        setTotal(prev => prev + 1)
                        document.getElementById("txt-input").value = ""
                        document.getElementById("select-input").value = 1
                        setQuantity(1)
                        setDescription("")
                    }
                }>Add</button>
            </div>
        </div>
    )
}


function PackagingList({items, setItems, setQuantity, setPackedQty}) {
    return(
        <div className="list">
            {items.length === 0 && <h1 className='poor-txt'>Been rustin here for centuries.. <br /> or has it already been a few eons?</h1>}
            {items.map(item => <Item item={item} setItems={setItems} key={item.id} setQuantity={setQuantity} setPackedQty={setPackedQty} />)}
        </div>
    )
}

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

function Stats({quantity, packedQty}){
    return (
        <footer className="stats">
            {
                quantity === 0
                    ? <span>You have no items on your list</span>
                    : <span>You have <span className='stats-ct-red'><span className="stats-ct">{quantity}</span>{quantity === 1 ? ' item' : ' items' }</span> on your list
                { packedQty === 0
                    ? <span>, and You've packed <span className='stats-ct-red'>None.</span></span>
                    : <span>. You've already packed <span className='stats-ct-green'><span className="stats-ct"> {packedQty}</span> {packedQty === 1 ? 'item' : 'items'}</span>.</span>
                }
                </span>
            }
        </footer>
    )
}

function App() {

    const [ items, setItems ] = useState([])
    const [ quantity, setQuantity ] = useState(items.length)
    const [ packedQty, setPackedQty ] = useState(0)

  return (
      <div className="main-container">
          <Logo />
          <Form items={items} setItems={setItems} setTotal={setQuantity} />
          <PackagingList items={items} setItems={setItems} setQuantity={setQuantity} setPackedQty={setPackedQty} />
          <Stats quantity={quantity} packedQty={packedQty} />
      </div>
  )
}


export default App;
