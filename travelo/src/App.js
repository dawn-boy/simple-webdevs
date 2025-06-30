import './styles.css'
import { useState } from 'react';
import Logo from "./features/Logo";
import Form from "./features/Form";
import PackagingList from "./features/PackagingList";
import Stats from "./features/Stats";

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