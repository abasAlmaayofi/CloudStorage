import React, { useState, useEffect } from 'react';
import { db, storage } from './firebase';
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore"; 
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import {MuiFileInput} from 'mui-file-input';



const FolderFileUpload = () => {
    const variableRand = "Kuwait Law";
    const [bufferList, setBufferList] = useState([]);
    const [folderNameSelectFirst, setFolderNameSelectFirst] = useState('');
    const [folderNameSelectSecond, setFolderNameSelectSecond] = useState('');
    const [folderName, setFolderName] = useState('');
    const [fileUpload, setFileUpload] = useState(null); 
    const fileListRef = ref(storage, "KiLAW");
    const [fileListURL, setFileListURL] = useState([]);
    const [radio, setRadio] = useState("select");
    const [parentFolderListNames, setParentFolderListNames] = useState([])
    const [folderNameSelectSecondList, setFolderNameSelectSecondList] = useState([]);
    const [folderNameList, setFolderNameList] = useState([]);
    const [fileNameList, setFileNameList] = useState([]);
    const [fileListNames, setFileListNames] = useState({});
    const [bufferListSecond, setBufferListSecond] = useState([]);
    const [bufferListFolder, setBufferListFolder] = useState([]);
    const uploadFile = () => {
        if (fileUpload == null) return;
        const fileRef = ref(storage, `files/${fileUpload.name}`);
        uploadBytes(fileRef, fileUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setFileListURL((prev) => [...prev, url])
            })
            setFileListNames((prev) => [...prev, snapshot.ref.name])
            console.log(snapshot);
            
        }).catch(err => window.alert(err))

    }
    const addDataFun = async () => {
        if ((folderName=="") || (folderNameSelectSecond=="") || (fileUpload.name=="")){
            window.alert(folderName + "failed");
            return;
        }
        try{
            const docRef = await addDoc(collection(db, folderNameSelectFirst), {
                folderNameSelectSecond: folderNameSelectSecond,
                folderName: folderName,
                fileName: fileUpload.name 
                });
                window.alert("folder has been created successfully!")
        }catch(err) {
            window.alert(err);
        }
    }

    const getFolderNameList = async () => {
        setFolderNameList(() => []);
        const q = query(collection(db, folderNameSelectFirst), where("folderNameSelectSecond", "==", folderNameSelectSecond));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            setBufferListFolder((prev) => [...prev, doc.data().folderName]);            
    });
    }

    const getDataFun = async () => {
        await getFolderNameList()
        var newArray2 = bufferListFolder.filter(function(elem, pos) {
            return bufferListFolder.indexOf(elem) == pos;
        });
        setFolderNameList(newArray2);
        console.log(bufferListFolder);

        
    };
    
    useEffect(() => {
        getDataFun();
    }
    ,[folderNameSelectFirst, folderNameSelectSecond, folderName])
    
    const handleSubmitFile = (e) => {
        e.preventDefault();
        addDataFun();
        var fileRef = ref(storage, `${folderNameSelectFirst}/${folderNameSelectSecond}/${folderName}/${fileUpload.name}`);
        if ((folderName== "")){
            fileRef = ref(storage, `${folderNameSelectFirst}/${folderNameSelectSecond}/${fileUpload.name}`);
        }
        if(fileUpload != null) { 
            uploadBytes(fileRef, fileUpload).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                    setFileListURL((prev) => [...prev, url])
                })
                console.log(snapshot);
                window.alert(snapshot.ref.name)
                
            }).catch(err => window.alert(err))
        }else{
            window.alert("There is no file selected!")
        }

        
    }
    const createFolder = (folderNameSelectFirst) => {
        if(typeof folderName !== "undefined") {
            getDataFun(folderNameSelectFirst);
        }else{
            window.alert("folder name is empty!")
        }
    }
    
        

  return (
    <div className='md:w-3/6 w-5/6 mt-4 rounded-xl border border-gray-400 shadow-md p-5 relative -top-38'>
        <form onSubmit={handleSubmitFile}>
            <h1 className='text-2xl tracking-wide text-logo-blue font-extrabold pt-2 border-b-4 border-logo-blue text-right'>تحميل الملفات</h1> 
            <div className='mt-5 flex flex-col md:flex-row gap-2'>
                <select required className="w-full border-2 rounded-md p-3 border-1 border-gray-500" onChange={(e) => {
                    setFolderNameSelectFirst(e.target.value);
                    }}>
                    <option className='text-gray-200 text-right' selected="selected" value="">-لم يتم تحديد مجلد-</option>
                    <option value="(Kuwait University) جامعة الكويت">Kuwait University - جامعة الكويت</option>
                    <option value="(KiLAW) كلية القانون الكويتية العالمية">KiLAW - كلية القانون الكويتية العالمية"</option>
                    
                </select>
                <select required className="w-full border-2 rounded-md p-3 border-1 border-gray-500" onChange={(e) => {
                    setFolderNameSelectSecond(e.target.value);
                }
                    }>
                <option className='text-gray-200 text-right' selected="selected" value="">-لم يتم تحديد مجلد-</option>
                {(folderNameSelectFirst == "(Kuwait University) جامعة الكويت") && (
                    <>
                        <option value="سنة أولى">سنة أولى</option>
                        <option value="سنة ثانيه">سنة ثانيه</option>
                        <option value="سنة ثالثه">سنة ثالثه</option>
                        <option value="سنة ثالثه">سنة رابعه</option>
                    </> 
                )}
                {(folderNameSelectFirst == "(KiLAW) كلية القانون الكويتية العالمية") && 
                    <option value="عام">عام</option>
                }
                </select>
            </div>
            <div className='w-full mt-5 border-b border-logo-blue pb-3 border-t border-gray-500 '>
                <input required type="text" value={folderName} placeholder='إسم مجلد' className="w-full mt-2 border-2 border-gray-500 rounded-md p-3 text-right" onChange={(e) => setFolderName(e.target.value)}/>
            </div>
            <div className='w-full grid grid-cols-1 mt-4'>
            <p className='text-right text-gray-800 text-md tracking-wide border-r-2 border-gray-800 pr-2'>اختار الملف المطلوب تحميلة</p>
            <MuiFileInput className='text-right' sx={{marginTop: 2,  textAlign: "right"}} value={fileUpload} onChange={e => setFileUpload(e)} placeholder='اختار ملف'></MuiFileInput>
            </div>
            <div className='w-full flex justify-end mt-2'>
            <button className=" border rounded-md py-4 px-7 bg-logo-blue shadow-md text-white hover:bg-white hover:text-logo-blue border-2 border-logo-blue hover:shadow-md" type='submit'>رفع ملف</button>
            </div>
           
        </form> 
    </div>
  )
}

export default FolderFileUpload;