import FileManager from "./components/FileManager";
import dynamic from 'next/dynamic'
import Navigation from "./components/Navigation";
const DicomViewer = dynamic(() => import('./components/DicomViewer'), { ssr: false })

export default function Index() {
    return (
        <div className="mt-10 ml-10 h-screen">
            <DicomViewer/>
            <div className='overflow-y-auto h-1/3 no-scrollbar'>
                <FileManager />
            </div>
        </div>
    )
}