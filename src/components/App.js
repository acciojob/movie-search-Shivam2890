
import React, { useEffect, useState } from "react";
import './../styles/App.css';

const App = () => {
  const [text, setText] = useState("")
  const [data, setData] = useState([])
  const [input, setInput] = useState("")
  const [hasSearch, setHasSearch] = useState(false)
  const [error, setError] = useState("")
  const api = "99eb9fd1";

const controllerRef = React.useRef(null)

console.log(controllerRef)

  const fetchApi = () => {

  }
  useEffect(() => {
    if (!input.trim()) {
      setData({})
      setError("")
      return;
    }
    controllerRef.current = new AbortController()
    const signal = controllerRef.current.signal

    const timer = setTimeout(() => {
      fetch(`https://www.omdbapi.com/?apikey=${api}&t=${text}`, { signal })
        .then(res => res.json())
        .then(dat => {
          dat.Response === "True" ? (console.log(dat), setData(dat), setError("")) : (setData({}), setError(dat.Error))
        })
        .catch(err => {
          console.log( "error",err)
          if (err.message === "AbortError") {
            console.log("Request timed out")
          }
        })

    }, 1500);

    return () => {
      clearTimeout(timer)
      controllerRef.current.abort()
    }
  }, [input])

  // const handleChange = (e) => {
  //   setText(e.target.value)
  // }
  const handleClick = () => {

    setInput(text)
    setHasSearch(true)
    // console.log("clicked")
  }

  // console.log(input)
  return (
    <div>
      <h2>Search Movies</h2>
      <input type="text"
        placeholder="Search Movies"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleClick}>Search</button> <br />

      <button onClick={()=>controllerRef.current.abort()}>STop</button>

      {data.Title && (
        <>
          <h2>{data.Title} ({data.Year})</h2>
          {data.Poster !== "N/A" && <img src={data.Poster} />}
        </>
      )}

      {error && <h1>{error}</h1>}

      {/* {data.Response === "True" && (
        <>
          <h2>{data.Title} {data.Year}</h2>
          <img src={data.Poster} />
        </>
      )}

      {error && <h1>{error}</h1>} */}
      {/* {hasSearch && data.Response === "False" && (
        <h1>{data.Error}</h1>
      )} */}
    </div>
  )
}

export default App
