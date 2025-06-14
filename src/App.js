import './App.css';
import {useEffect, useRef, useState} from "react";
import { v4 as uuid } from 'uuid';

function App() {
    const [searchTerm, setSearchTerm] = useState("")
    const [showWelcomeMessage, setShowWelcomeMessage] = useState(true)
    const [loading, setLoading] = useState(false)

    return (
          <div>
              <NavBar />
              <Description />
              <Search
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  setShowWelcomeMessage={setShowWelcomeMessage}
                  showWelcomeMessage={showWelcomeMessage}
                  loading={loading}
                  setLoading={setLoading}
              />
              <MovieGrid
                  searchTerm={searchTerm}
                  showWelcomeMessage={showWelcomeMessage}
                  loading={loading}
                  setLoading={setLoading}
              />
          </div>
    )
}
const NavBar = () => {
  return(
      <div className="nav-bar">
        <Logo />
        <Menu />
        <UserAuth />
      </div>
  )
}
const Logo = () => {
  return (
      <h1 className="logo">
          <span className="the">T</span>
          <span className="the">he</span>
          <span className="big-letter-col">C</span>
          <span className="small-letters-col">olosseum</span>
      </h1>
  )
}
const Menu = () => {
  return (
        <ul className="menu">
          <li><a>Streaming</a></li>
          <li><a>Plans</a></li>
          <li><a>About</a></li>
          <li><a>Contact Us</a></li>
        </ul>
  )
}
const UserAuth = () => {
  return (
      <div className="user-auth">
          <span><a className="login-btn">Login</a></span>
          <span><a>/</a></span>
          <span><a className="register-btn">Register</a></span>
      </div>
  )
}
const Description = () => {
  return (
      <div className="description">
        <h1 className="desc-title">The <span className="gradient-text">Arena</span> Talks!</h1>
        <p className="desc-paragraph">
          Step into the halls of cinema. Discover timeless classics, trending blockbusters, and hidden indie gems — all in one place.
        </p>
      </div>
  )
}
const Search = ({ showWelcomeMessage, loading, searchTerm, setSearchTerm, setShowWelcomeMessage, setLoading }) => {
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
const MovieGrid = ({ searchTerm, showWelcomeMessage, loading, setLoading })=> {

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
const MovieTile = ({ data }) => {
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
              <p>{data.Year.split('–')}</p>
              <p>{data.Type}</p>
          </div>
      </div>
  )
}

export default App;
