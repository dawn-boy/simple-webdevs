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

export default Stats;