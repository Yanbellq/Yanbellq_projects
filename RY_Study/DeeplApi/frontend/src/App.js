import React, { useState, useEffect } from 'react'
import useApi from './services/useApi';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import './App.css';
import Button from './components/button';
import { IoExitOutline } from "react-icons/io5";
import FormControl from './components/form-control';

function App() {

    const languages = [
        {code: 'be', name: 'Belarusian'},
        {code: 'ru', name: 'Russian'},
        {code: 'zh', name: 'Chinese'},
        {code: 'hr', name: 'Croatian'},
        {code: 'cs', name: 'Czech'},
        {code: 'da', name: 'Danish'},
        {code: 'et', name: 'Estonian'},
        {code: 'fi', name: 'Finnish'},
        {code: 'fr', name: 'French'},
        {code: 'el', name: 'Greek'},
        {code: 'hu', name: 'Hungarian'},
        {code: 'is', name: 'Icelandic'},
        {code: 'ga', name: 'Irish'},
        {code: 'it', name: 'Italian'},
        {code: 'ja', name: 'Japanese'},
        {code: 'kk', name: 'Kazakh'},
        {code: 'ko', name: 'Korean'},
        {code: 'lv', name: 'Latvian'},
        {code: 'lt', name: 'Lithuanian'},
        {code: 'lb', name: 'Luxembourgish'},
        {code: 'uk', name: 'Ukrainian'},
        {code: 'en', name: 'English'},
        {code: 'de', name: 'German'},
    ]

    const { data, loading, error, request } = useApi();
    const [token, setToken, deleteToken] = useCookies('self-token');
    const [userName, setUserName, deleteName] = useCookies('self-name');
    const [userEmail, setUserEmail, deleteMail] = useCookies('self-mail');

    const [textValue, setTextValue] = useState('');
    const [langFrom, setLangFrom] = useState('');
    const [langTo, setLangTo] = useState('');
    const [price, setPrice] = useState(0.0);
    const [errorValue, setErrorValue] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        if(!token['self-token']) navigate('/')
    }, [token])

    const logoutUser = () => {
        deleteToken(['self-token']);
        deleteName(['self-name']);
        deleteMail(['self-mail']);
        navigate('/');
    }

    const calculatePrice = (value) => {
        setTextValue(value);
        const calculatedPrice = value.length / 10;
        setPrice(calculatedPrice);
        console.log(value.length);
        if(textValue.length < 9) setErrorValue('Error, text must be more than 10 characters')
        else if(textValue.length >= 9) setErrorValue('');
    }

    const sendData = () => {
        console.log(textValue.length);
    
        if(textValue.length < 9) setErrorValue('Error, text must be more than 10 characters')
        else if(textValue.length >= 9) {
            setErrorValue('');

            const send = async () => {
                const resp = await request({ 
                    url: '/api/generate-invoice/', 
                    method: 'POST', 
                    body: {
                        text: textValue, 
                        lang_from: langFrom, 
                        lang_to: langTo, 
                        returnUrl: window.location.href
                    }, 
                    auth: true 
                });
                
                // console.log(resp);
                window.location.href = resp.invoiceUrl;
                // console.log(resp);
            }
            send();
        }

    }


    return (
        <section className='border h-[100dvh] bg-sky-50 flex justify-center items-center relative'>
            <div>
                <div className='flex items-end flex-col mb-2 text-sm text-gray-500'>
                    <p>{ userName['self-name'] }</p>
                    <p>{ userEmail['self-mail'] }</p>
                </div> 
                <div className='form form--translate w-[450px] bg-[#fff] rounded-xl flex items-center flex-col px-0 pt-4 pb-6'>
                    <h2 className='text-[3rem] font-semibold'>Translate</h2>

                    <div className='flex flex-col w-[100%]'>
                        <FormControl 
                            Label="Text for translate:"
                            For="textTranslate"
                            Id="textTranslate"
                            Control="textarea"
                            Placeholder="Enter text here..."
                            Value={null}
                            OnChange={(evt) => calculatePrice(evt.target.value)}
                            classAddGroup='flex-col p-0 mt-3 w-[100%] px-5'
                            classAddName='text-base text-black font-semibold'
                            classAddControl='border border-gray-300 rounded-md p-3 w-[100%] ml-[0px_!important] mt-2 resize-none h-40'
                        />
                        <p className='px-5 text-red-600'>{ errorValue }</p>
                    </div>

                    <div className='flex gap-3 w-[100%] px-5 mt-4'>
                        <div className='w-[100%] flex flex-col'>
                            <label className='text-base text-black font-semibold'>From: </label>
                            <select 
                                id='lang_from'
                                name='lang_from'
                                value={langFrom}
                                onChange={(e) => setLangFrom(e.target.value)}
                                className='mt-2 border border-gray-400 p-2 bg-[transparent] rounded-md'
                            >
                                <option key='default' value='none' selected>Select</option>
                                { languages.map((lang) => (
                                    <option key={lang.code} value={lang.code.toUpperCase()}>
                                        { lang.name }
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className='w-[100%] flex flex-col'>
                            <label className='text-base text-black font-semibold'>To: </label>
                            <select 
                                id='lang_to'
                                name='lang_to'
                                value={langTo}
                                onChange={(e) => setLangTo(e.target.value)}
                                className='mt-2 border border-gray-400 p-2 bg-[transparent] rounded-md'
                            >
                                <option key='default' value='none' selected>Select</option>
                                { languages.map((lang) => (
                                    <option key={lang.code} value={lang.code.toUpperCase()}>
                                        { lang.name }
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <p className='w-[100%] px-5 mt-4 text-base text-black font-semibold'>Cost: <span>{ price }UAH</span></p>

                    <Button onClick={() => sendData()} classAdd='hover:bg-[#3067d6] px-[20px] py-[15px] text-[30px] border-[#3067d6] bg-[#3067d6] text-white' info="Translate" />
                </div>
            </div>

            <IoExitOutline className='fixed w-[30px] h-[30px] top-3 right-3 cursor-pointer text-gray-500' onClick={() => logoutUser()} />
        </section>
    );
}

export default App;
