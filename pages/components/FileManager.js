import React, {useEffect, useState} from 'react'
import FolderItem from './FolderItem';
import getData from '../../utils/getData';

export default function FileManager({dir = 'smart_health_care',  depth = 0}) {
    
    const [data, setData] = useState([]);
   
    useEffect(() => {
    
      // let URL = dir !=='' ? `api/dicom/${dir}` : `api/dicom`

      getData(`api/dicom/${dir}`).then(data => {
        const newData = data.map(item => {
          if (item.includes(".")) {
            return { path: item, isDir: false };
          } else {
            return { path: item, isDir: true };
          }
        });
        setData(newData);
     
      })
    }, [])
    
   

  return (
    <>
        {data.map((item, index) => (
            <FolderItem item={item} key={index} dir={dir} depth={depth} />
        ))}
        </>
  )
}
