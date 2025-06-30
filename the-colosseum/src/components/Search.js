export const Search = ({ showWelcomeMessage, loading, searchTerm, setSearchTerm, setShowWelcomeMessage, setLoading }) => {
    let timeout;

    const handleSearch = e => {
        if(timeout) clearTimeout(timeout);

        timeout = setTimeout(() => {
            setSearchTerm(e.target.value);
            setShowWelcomeMessage(false);
            setLoading(true)
            if (!e.target.value.length > 0) setShowWelcomeMessage(true)
        }, 1000)
    }

    return (
        <div>
            <form className="search-form" onSubmit={e => e.preventDefault()}>
                <input type="text"
                       placeholder="Start Streaming Now!"
                       onChange={handleSearch}
                       id="search-bar"
                />
            </form>
            {
                !showWelcomeMessage && !loading && <h2 className="search-info">Showing results for <span className="search-info-term gradient-text">{searchTerm}</span></h2>
            }
        </div>
    )
}
