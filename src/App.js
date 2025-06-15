import './App.css';
import { useState } from "react";
import {NavBar} from "./components/NavBar";
import {Description} from "./components/Description";
import {Search} from "./components/Search";
import {MovieGrid} from "./components/MovieGrid";



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
                  showWelcomeMessage={showWelcomeMessage}
                  setShowWelcomeMessage={setShowWelcomeMessage}
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


export default App;
