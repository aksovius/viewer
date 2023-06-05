import React, { useEffect, useRef,useContext } from 'react';
import dicomParser from 'dicom-parser';
import * as cornerstone from 'cornerstone-core';
import cornerstoneDICOMImageLoader from '@cornerstonejs/dicom-image-loader';
import cornerstoneWebImageLoader from 'cornerstone-web-image-loader';

import { Context } from '../_app';

const DicomViewer = () => {
  
  const  {image} = useContext(Context);
  const imageElement = useRef();

  useEffect(() => {
    cornerstoneDICOMImageLoader.external.cornerstone = cornerstone;
    cornerstoneDICOMImageLoader.external.dicomParser = dicomParser
    cornerstoneWebImageLoader.external.cornerstone = cornerstone;
    cornerstone.enable(imageElement.current);
  },[])
  

  useEffect(() => {
    if (image) {
      console.log(image)
      if(image == "no-image.jpg"){
        loadAndViewImage(`https://${process.env.HOST}/viewer/no-image.jpg`);
      } else {
        loadAndViewImage(`https://${process.env.HOST}/viewer/api/dicom/${image}`);
      }
      
    }
    
  }, [image]);

const loadAndViewImage = (imageUrl) => {
  console.log(imageUrl)
  if(imageUrl.endsWith('.jpg') || imageUrl.endsWith('.png')|| imageUrl.endsWith('.tif')) {
    // Handle JPG, PNG, or TIF file
    displayDicomImage(imageUrl);
  }
  else if(imageUrl.endsWith('.dcm')) {
    fetch(imageUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.arrayBuffer();
      })
      .then(arrayBuffer => {
        const file = new File([arrayBuffer], "filename.dcm", {type: "application/dicom"});
        const imageId = cornerstoneDICOMImageLoader.wadouri.fileManager.add(file);
        displayDicomImage(imageId);
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
      });
}

}

const displayDicomImage = (imageId) => {
  cornerstone.loadImage(imageId).then((image) => {
    const viewport = cornerstone.getDefaultViewportForImage(imageElement.current, image);
    cornerstone.displayImage(imageElement.current, image, viewport);
  }).catch((err) => {
    console.error("Error loading image", err);
  });
}

 

  return (
    <div className='w-[512px] h-[512px]' ref={imageElement} ></div>
  );
}

export default DicomViewer;