const isAvailable = (items, description) => {
    return items.some(
        item => item.description === description
    )
}

export { isAvailable }