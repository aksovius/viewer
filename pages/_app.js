import React, { createContext, useState } from 'react';
import '../styles/globals.css'

export const Context = createContext();

export default function App({ Component, pageProps }) {
  const [image, setImage] = useState("no-image.jpg");
  const [path, setPath] = useState([]);
  return (
    <Context.Provider value={{ image, setImage, path, setPath }}>
       <Component {...pageProps} />
    </Context.Provider>
  );
}

