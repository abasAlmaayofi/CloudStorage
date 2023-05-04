import { Container } from '@mui/system';
import { getDownloadURL, ref } from 'firebase/storage';
import React, { useCallback, useEffect, useState } from 'react';
import { db, storage } from './firebase';
import CloseIcon from '@mui/icons-material/Close';
import UniData from "../constants/UniData.json";
import FoldersData from "../constants/FoldersData.json";
import FilesData from "../constants/FilesData.json"; 
import Files2Data from "../constants/Files2Data.json"; 
import { json } from 'react-router-dom';
import blueFolder from '../assets/blueFolder.png';
import OpenInFullIcon from '@mui/icons-material/OpenInFull'
import { Button, IconButton, Menu } from '@mui/material';
import { MenuItem } from '@mui/base';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FolderIcon from '@mui/icons-material/Folder';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { ArrowDownward, FileDownload, Margin } from '@mui/icons-material';
import { collection, getDocs } from 'firebase/firestore';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';




const Showfiles = () => {
    const Stylefiles = 'w-full mx-2 text-rigth mt-4 border-r-2 border-black px-5 rounded-sm';
    const [arrow, setArrow] = useState("");
    const [arrowBool, setArrowBool] = useState(false)
    const [numberVariable, setNumberVariable] = useState(0)
    const [expandFolder1, setExpandFolder1] = useState(false);
    const [expandFolder2, setExpandFolder2] = useState(false);
    const [expandFolder, setExpandFolder] = useState([false, false, false]);
    const [model, setModel] = useState(false);
    const [bufferListSecond, setBufferListSecond] = useState([]);
    const [parsedData,  setParsedData] = useState(null);
    const [parentFolderNames, setParentFolderNames] = useState([])
    const [linkURL, setLinkURL] = useState("");
    const [link, setLink] = useState("");
    const [random, setRandom] = useState(false);
    const [bufferListFolder, setBufferListFolder] = useState([]);
    const [bufferListFile, setBufferListFile] = useState([]);
    const [trigger, setTrigger] = useState(false)
    const [uni, setUni] = useState("");
    const [folderNameSelectFirstList, setFolderNameSelectFirstList] = useState(["(Kuwait University) جامعة الكويت", "(KiLAW) كلية القانون الكويتية العالمية"]);
    const [folderNameSelectSecondList, setFolderNameSelectSecondList] = useState([]);
    const [folderNameList, setFolderNameList] = useState([]);
    const [fileNameList, setFileNameList] = useState([]);
    
    useEffect(()=> {
        if (link != ""){
            getDownloadURL(ref(storage, link)).then((url) => {
                setLinkURL(url);
                console.log(url)
            })
        }
        getDataFun();
    }, [link, uni, expandFolder, trigger])

    
    const getFil = (name) => {
        getDownloadURL(ref(storage, name)).then((url) => {
            setLinkURL(url);
        })
    } 
    const reload = () => {
        window.location.reload();
    }
    const getDataFun = async () => {
        setFolderNameSelectSecondList(() => []);
        setBufferListSecond(() => []);
        setBufferListFolder(() => []);
        setBufferListFile(() => []);
        setFolderNameList(() => []);
        setFileNameList(() => []);
        const querySnapshot = await getDocs(collection(db, uni));
        querySnapshot.forEach((doc) => {
            if (((uni == "(Kuwait University) جامعة الكويت") && (doc.data().folderNameSelectSecond != "عام")) || ((uni == "(KiLAW) كلية القانون الكويتية العالمية") && (doc.data().folderNameSelectSecond != "سنة أولى"))){
                setBufferListSecond((prev) => [...prev, doc.data().folderNameSelectSecond]);
            }
            if (expandFolder[0] == doc.data().folderNameSelectSecond){
                setBufferListFolder((prev) => [...prev, doc.data().folderName]);
            }
            if (expandFolder[1] == doc.data().folderName){
                setBufferListFile((prev) => [...prev, doc.data().fileName]);
            }
        });
        var newArray1 = bufferListSecond.filter(function(elem, pos) {
            return bufferListSecond.indexOf(elem) == pos;
        });
        setFolderNameSelectSecondList(newArray1);

        var newArray2 = bufferListFolder.filter(function(elem, pos) {
            return bufferListFolder.indexOf(elem) == pos;
        });
        setFolderNameList(newArray2);

        var newArray3 = bufferListFile.filter(function(elem, pos) {
            return bufferListFile.indexOf(elem) == pos;
        });
        setFileNameList(newArray3);
       
        console.log(folderNameSelectSecondList);
        console.log(bufferListSecond); 
    }

    const ArrowComponent = ({onClick, Arrow, id}) => {
        return (
            <>
            <p id={id} onClick={onClick} className='text-lg text-gray-600 w-full p-2 rounded-md shadow-md border-black border flex justify-between items-center'>
                <span>
                <IconButton >
                    {(arrow==id) ? <ArrowDownward/> : <ArrowBackIcon/>}
                </IconButton>
                </span>
                <span>  
                <span className='text-sm mr-2'>{id}</span>
                <FolderIcon/>  
                </span> 
            </p>
            </>
        );
    }
    const setArrowFunc = (e) => {
        return (arrowBool ? setArrow("") : setArrow(e.target.id));
    }

  return (
    <Container maxWidth='xl'>
        <div id='notes_container' className='w-full p-4 text-gray-600 text-md tracking-wide font-bold text-right space-wrap'>
            <p>2 :عدد المجلدات / الملفات</p>
        </div>

        <div>
            <ul>
                    {folderNameSelectFirstList.map((uniname, key) => {
                        return (
                    <li key={key} className='flex w-full flex-col p-4 pt-0 rounded gap-4'>
                        <ArrowComponent id={uniname} onClick={(e) => {
                            setExpandFolder([false, false, false]);
                            setUni(uniname);
                            getDataFun();
                            setArrowBool(!arrowBool);
                            setArrowFunc(e);
                        }} />
                        <div className={`${Stylefiles} ${(arrow == uniname) ? '' : 'h-0 overflow-hidden'}`}>
                            <p className='text-right text-sm text-gray-400 p-2 tracking-wide font-light capitalize underline leading-4'>
                                { expandFolder[1] && 
                                <Button variant='contained' sx={{backgroundColor: (expandFolder[2] ? "gray" : "") , margin: 1}}>
                                    <a className='cursor-pointer' onClick={() => setExpandFolder([expandFolder[0], expandFolder[1], false])}>{expandFolder[1]}</a>
                                </Button>
                                } 

                                { expandFolder[0] && 
                                <Button variant='contained' sx={{backgroundColor: (expandFolder[1] ? "gray" : ""), margin: 1}}>
                                    <a className='cursor-pointer' onClick={() => setExpandFolder([expandFolder[0], false, false])}>/ {expandFolder[0]}</a>
                                </Button>
                                }
                                <Button variant='contained' sx={{backgroundColor: (expandFolder[0] ? "gray" : ""), margin: 1}}>
                                    <a className='cursor-pointer' onClick={() => {
                                        setExpandFolder([false, false, false]);
                                        }}>/ رئيسي
                                    </a>
                                </Button>
                                
                            
                            </p>
                            { !expandFolder[0] && (
                            <div className='flex flex-row-reverse gap-4 flex-wrap'>
                                {folderNameSelectSecondList.map((child, key) => {
                                    return (
                                        <div>
                                        {(typeof child != "") &&  
                                            <div key={key} id={child} onClick={(e) => {
                                                setExpandFolder([e.target.id, false, false]);
                                                }} className= 'overflow-scroll w-44 transition border-gray-400 text-gray-500 ease-in-out delay-150 hover:scale-105 hover:text-logo-blue hover:border-[#1769aa] flex border h-20  flex-col justify-center items-center '>
                                            <FolderIcon style={{fontSize: 60}}/>
                                            <p className='text-xs  relative whitespace-nowrap text-ellipsis	'>{child}</p>
                                            </div>
                                        }
                                        </div>
                                        
                                    )
                                })}
                            </div> )}
                            {(expandFolder[0] && !expandFolder[1]) && (
                            <div className='flex flex-row-reverse gap-4 flex-wrap'>
                                {folderNameList.map((children, key) => {
                                    return (
                                        <div>
                                        {(children != "") && 
                                        <div key={key} id={children} onClick={(e) => {setExpandFolder([expandFolder[0], e.target.id, false])}} className= 'overflow-scroll  w-44 text-gray-500 transition border-gray-400 ease-in-out delay-150 hover:text-logo-blue hover:border-[#1769aa] hover:scale-105 flex border h-24  flex-col justify-center items-center '>
                                                <FolderIcon style={{fontSize: 60}}/>
                                            <p className='text-xs relative whitespace-wrap text-center text-ellipsis'>{children}</p>
                                        </div>
                                        }
                                        </div>
                                    )
                                })}

                            </div>) }
                            {expandFolder[1] && (
                            <div className='flex flex-col gap-2 pr-3'>
                                {fileNameList.map((grandchildren, key) => {
                                    return (
                                        <>
                                        <div>
                                            {(grandchildren != "") && 
                                            <div key={key} id={grandchildren} onClick={(e) => {setExpandFolder([expandFolder[0], expandFolder[1], e.target.id])}}  className= 'overflow-scroll border-gray-400  transition ease-in-out delay-150 hover:text-black hover:scale-105 rounded-md hover:border-black flex border p-3 justify-between items-center'>
                                            <p className='text-xs relative whitespace-wrap text-ellipsis'>{grandchildren}</p>
                                            <IconButton size="small">
                                                <FileDownload onClick={() => {
                                                setLink(`${uniname}/${expandFolder[0]}/${expandFolder[1]}/${grandchildren}`);
                                                setModel(true);
                                                }} style={{fontSize: 30}}/>
                                            </IconButton>
                                            
                                            </div>
                                            }
                                        </div>
                                        </>
                                    )
                                })}

                            </div>) }

                        </div>
                    </li>
                        );
                    })}
            </ul>
        </div>
        
        
        {model && (
        <div className='z-10 flex-col flex items-center fixed bg-black/40 backdrop-blur-lg justify-center gap-8 inset-0'>
            <div className='md:w-2/3 w-full h-full flex justify-right p-4'>
                <div onClick={() => setModel(false)} className='text-3xl cursor-pointer text-white z-14 relative -top-5 -right-3'><CloseIcon className='border hover:bg-gray-200 hover:border-gray-200 hover:text-black rounded-md border-white-800' /></div>
                <iframe target="_parent" className='w-full h-full' src={linkURL} ></iframe>
            </div>
        </div>
        )}
        
    </ Container>
  )
}

export default Showfiles;