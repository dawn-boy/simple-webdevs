export const MovieTile = ({ data }) => {
    return(
        <div className="movie-tile">
            <img
                src={ data.Poster }
                alt={ data.Title }
                id="movie-poster"
                className="movie-img"
                onError={ e => {
                    e.target.onerror = null
                    e.target.src = './img/poster-not-found.png';
                }}
            />
            <p className="movie-title">{data.Title}</p>
            <div className="movie-details">
                <p>{data.Year}</p>
                <p>{data.Type}</p>
            </div>
        </div>
    )
}
