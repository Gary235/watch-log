import { useEffect, useState } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"

import ContentContext from "./contexts/content-context"
import getContentTypes from "./utils/get-content-types"

import Home from "./views/Home"
import ListView from "./views/List"
import WatchingTab from "./views/WatchingTab"
import WatchListTab from "./views/WatchlistTab"

const App = () => {
  const [db, setDb] = useState({})

  useEffect(() => {
    const initialDb = {}

    const contentTypes = getContentTypes();
    contentTypes.forEach(type => {
      initialDb[type] = JSON.parse(localStorage.getItem(type)) || [];
    })

    setDb(initialDb)
  }, [])

  const value = {db, setDb}

  return (
    <ContentContext.Provider value={value}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index path="watching" element={<WatchingTab />} />
            <Route path="watch-list" element={<WatchListTab />} />
          </Route>
          <Route path="list/:contentType" element={<ListView />} />
        </Routes>
      </BrowserRouter>
    </ContentContext.Provider>
  )
}

export default App
