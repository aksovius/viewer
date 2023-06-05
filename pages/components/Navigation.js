import React, { useContext } from 'react'
import Context from '_app'


export default function Navigation() {

    const {path, setPath} = useContext(Context);
    console.log('path :>> ', path);
  return (
    <div>Navigation</div>
  )
}
