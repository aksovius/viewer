import React, {useState, useContext} from 'react'
import FileManager from './FileManager';
import { Context } from '../_app';

export default function FolderItem({item, depth, dir}) {
   
    const [open, setOpen] = useState(false);
    const {setImage} = useContext(Context);
    const handleClick = (event,item) => {
        event.preventDefault();
        if (item.path.match(/\.(dcm|jpg|png|tif)$/)) {
            console.log(dir + '/' + item.path)
            setImage(dir + '/' + item.path);
        } else {
            setOpen(!open);
        }
    }
  return (
    <>
    <div className='flex select-none'>
    {/* {item.isDir && <button className='w-3 h-3 bg-red-500 mt-4 mr-3' onClick={event => handleClick(event, item)}  />}  */}
    <p 
        className={'cursor-pointer verflow-y-auto' + (item.isDir ? ' font-bold text-black-700' : ' text-black-500') + ' hover:text-blue-700 mt-2 block '} 
        style={{marginLeft: depth  + 'rem'}}
        onClick={event => handleClick(event, item)}
       >
        {item.path}
    </p> 
    </div>
        {item.isDir && open && <FileManager dir={dir + "/" + item.path} depth = {depth + 1} />} 
    
    </>
  )
}
