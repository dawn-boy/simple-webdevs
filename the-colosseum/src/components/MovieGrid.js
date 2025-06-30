import {useEffect, useRef, useState} from "react";
import {MovieTile} from "./MovieTile";
import { v4 as uuid } from 'uuid';

export const MovieGrid = ({ searchTerm, showWelcomeMessage, loading, setLoading })=> {

    const [movies, setMovies] = useState([]);
    const searchTermRef = useRef(searchTerm)
    const [page, setPage] = useState(1)
    const [movieNotFound, setMovieNotFound] = useState(false)
    const movieNotFoundRef = useRef(false)
    const [showScrollBtn, setShowScrollBtn] = useState(false)

    const fetchMovies = async ( term, pageNum ) => {
        if( !term || term.trim() === "") return;
        const url = `https://www.omdbapi.com/?s=${term}&apikey=e37eed48&page=${pageNum}`;
        setLoading(true)
        console.log(url)
        try{
            const res = await fetch(url)
            const data = await res.json()
            console.log(data)

            if(data.Response === 'True'){
                if(page === 1) setMovies(data.Search)
                else setMovies(prev => [...prev, ...data.Search])
            } else{
                if(page === 1) setMovies([])
                if(data.Error === 'Movie not found!' || data.Error === 'Too many results.'){
                    setMovieNotFound(true)
                    movieNotFoundRef.current = true
                }
            }
        } catch(err){
            console.log("Fetch Movies Error: ", err)
        } finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        searchTermRef.current = searchTerm;
    }, [searchTerm]);
    useEffect(() => {
        setPage(1)
        setMovieNotFound(false)
        movieNotFoundRef.current = false
    },[ searchTerm ] );
    useEffect(() => {
        fetchMovies(searchTerm, page)
    }, [ searchTerm, page ])

    useEffect(() => {
        let timeout;
        const handleScroll = () => {
            if(timeout) clearTimeout(timeout);

            timeout = setTimeout(() => {
                if( window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 1  && !loading && !movieNotFoundRef.current)
                {
                    console.log('trig1')
                    if( searchTermRef.current !== "" && searchTermRef.current.trim() !== ""){
                        setPage(prev => prev + 1)
                        console.log('trig2')
                    }
                }
                if(window.scrollY > 2000){
                    setShowScrollBtn(true)
                } else{
                    setShowScrollBtn(false)
                }
            }, 200)
        }
        document.addEventListener('scroll', handleScroll)
        return () => document.removeEventListener('scroll', handleScroll)
    }, []);

    const handleScrollBtn = () => {
        window.scrollTo({ top: 170, behavior: "smooth" });
    }


    return(
        <div>
            <div>
                {
                    showWelcomeMessage
                        ? <div className="no-movies">
                            Search your favorite Movies!
                        </div>
                        : loading === true
                            ? <div className='loading'>Loading...</div>
                            : <div className="movie-grid"> { movies.map( movie => <MovieTile data={movie} key={uuid()}/>) } </div>
                }
            </div>
            {
                movieNotFound && page === 1
                    ? <div className='end-reached'>No results found!</div>
                    : movieNotFound && <div className='end-reached'>Reached the end</div>
            }
            <div className="scroll-up">
                { showScrollBtn && <div className="scroll-up-btn" onClick={handleScrollBtn}>↑</div> }
            </div>

        </div>
    )
}
