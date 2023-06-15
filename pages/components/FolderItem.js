import React, {useState, useContext} from 'react'
import FileManager from './FileManager';
import { Context } from '../_app';

export default function FolderItem({item, depth, dir}) {
   
    const [open, setOpen] = useState(false);
    const {setImage,  setPath} = useContext(Context);
    const handleClick = (event,item) => {
        event.preventDefault();
        if (item.path.match(/\.(dcm|jpg|png|nii)$/)) {
            console.log(dir + '/' + item.path)
            setImage(dir + '/' + item.path);
        } else {
            setOpen(!open);
            navigateTo(item.path)
        }
    }

    const navigateTo = (itemPath) => {
        setPath((currentPath) => {
          // Check if the path exists in the current path array
          const existingIndex = currentPath.indexOf(itemPath);
      
          if (existingIndex !== -1) {
            // If it does, remove all items after it in the path
            return currentPath.slice(0, existingIndex + 1);
          } else {
            // Otherwise, add the new path to the end
            return [...currentPath, itemPath];
          }
        });
      };

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
