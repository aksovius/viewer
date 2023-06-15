import fs from 'fs'
import path from 'path'
import {promisify} from 'util'
const readdirAsync = promisify(fs.readdir);
const lstatAsync = promisify(fs.lstat);


export const config = {
  api: {
    responseLimit: false,
  },
} 
export default async function (req,res) {
    const subdir = req.query.slug || [];
    const sanitizedSubdir = subdir.map((part) => path.normalize(part).replace(/^(\.\.[\/\\])+/, ''));
    const directoryPath = path.join(process.env.IMAGE_DIR, ...sanitizedSubdir);
    try {
      if((await lstatAsync(directoryPath)).isFile()){
        // Create a read stream from the file
        const readStream = fs.createReadStream(directoryPath);

        // Pipe the read stream into the response
        readStream.pipe(res);

        // If there's an error, respond with an error message
        readStream.on('error', (err) => {
          console.error(err);
          res.status(500).end('Server error');
        });
      } else {

        const files = await readdirAsync(directoryPath);
        
        res.json(files);
      }
    } catch (err) {
      res.status(500).send('Unable to scan directory or read file: ' + err.message);
    }
  }

//     console.log(params)
//     const subdir = params.slug || [];
    
//     // const parts = subdir.split('/');
//     // const sanitizedParts = parts.map((part) => 
//     // path.normalize(part).replace(/^(\.\.[\/\\])+/, '')
//     // );
//     const sanitizedSubdir = subdir.map((part) => path.normalize(part).replace(/^(\.\.[\/\\])+/, ''));
//     const directoryPath = path.join("/home/gil/Desktop/colab", ...sanitizedSubdir);
//     console.log(directoryPath)
//     try {
//         const stats = await fs.promises.lstat(directoryPath);
//           if(stats.isFile()){
//             console.log('isFile')
//             try {
//               const fileStream = fs.createReadStream(directoryPath);
//               fileStream.pipe(res);
//             } catch (e) {
//               console.log(e)
//             }
           
//           } else {
//             const listDir = await readdirAsync(directoryPath);
//             console.log(listDir)
//             return NextResponse.json(listDir)
//           }
//         } catch (err) {
//             return NextResponse.error({status: 500, message: 'Unable to scan directory: ' + err});
//         }
    
// }
    // const subdir = req.query.subdir || [];
    
    // const sanitizedSubdir = subdir.map((part) => path.normalize(part).replace(/^(\.\.[\/\\])+/, ''));
    // const directoryPath = path.join("/home/gil/Desktop/colab", ...sanitizedSubdir);
  
    // try {
    //   if((await lstatAsync(directoryPath)).isFile()){
    //       const data = await readFileAsync(directoryPath);
    //       res.send(data);
    //   } else {
    //     const files = await readdirAsync(directoryPath);
    //     res.json(files);
    //   }
    // } catch (err) {
    //   res.status(500).send('Unable to scan directory or read file: ' + err.message);
    // }
//   }