import {isAvailable} from "../utils/isAvailable";
import {useState} from "react";

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

export default Form;