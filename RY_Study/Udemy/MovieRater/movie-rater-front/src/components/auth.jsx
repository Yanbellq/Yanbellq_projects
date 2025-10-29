import React, { useState, useEffect, useContext } from "react";
import useApi from "../services/useApi";
// import { TokenContext } from "../index";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import '../Auth.css';
import Button from "./button";
import FormControl from "./form-control";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { LuLock } from "react-icons/lu";

export default function Auth() {

    const { data, loading, error, request } = useApi();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoginView, setIsLoginView] = useState(true);

    // const {token, setToken} = useContext(TokenContext);
    const [token, setToken] = useCookies('mr-token');
    const navigate = useNavigate();


    useEffect(() => {
        // console.log('token: ', token['mr-token']);
        if(token['mr-token']) navigate('/movies')
    }, [token])

    const loginUser = () => {
        const getToken = async () => {
            const resp = await request({ url: '/auth/', method: 'POST', body: {username, password}, auth: false });
            if(resp) {
                setToken('mr-token', resp.token);
                navigate('/movies')
            }
        }
        getToken()
    }
    
    const registerUser = () => {
        const register = async () => {
            const resp = await request({ url: '/api/users/', method: 'POST', body: {username, password}, auth: false });
            resp && loginUser();
        }
        register()
    }

    const isDisabled = username === '' || password === ''

    return (
        <section className="auth">
            <div className="flex flex-col items-center border auth__form">
                {isLoginView ? <label htmlFor="username" className="auth__title">LOGIN</label> : 
                               <label htmlFor="username" className="auth__title">REGISTER</label>}

                <FormControl 
                    Label={<HiOutlineUserCircle />} 
                    For='username' 
                    Id='username' 
                    Type='text' 
                    Placeholder='Enter your username' 
                    Value={username} 
                    OnChange={(evt) => setUsername(evt.target.value)} 
                    classAddGroup='auth__control bg-gray-200'
                    classAddName='auth__control-title'
                    classAddControl='auth__control-input'
                />
                
                <FormControl 
                    Label={<LuLock />}
                    For='password' 
                    Id='password' 
                    Type='password' 
                    Placeholder='Enter your password' 
                    Value={password} 
                    OnChange={(evt) => setPassword(evt.target.value)}
                    classAddGroup='auth__control bg-gray-200'
                    classAddName='auth__control-title'
                    classAddControl='auth__control-input password'
                />

                <FormControl 
                    LabelCheckbox='Remember me'
                    For='rememberMe'
                    Id='rememberMe'
                    Type='checkbox'
                    Value={null}
                    OnChange={null}
                    classAddGroup='auth__control auth__control--checkbox'
                    classAddName='auth__control-title auth__control-title--checkbox'
                    classAddControl='auth__control-input auth__control-input--checkbox'
                    Control='checkbox'
                />

                { isLoginView ? 
                    <Button onClick={() => loginUser()} classAdd='hover:text-white w-[100%] text-center p-[50px] auth__btn' info='Login' disabled={isDisabled}/> :            
                    <Button onClick={() => registerUser()} classAdd='hover:text-white w-[100%] text-center p-[50px] auth__btn' info='Register' disabled={isDisabled}/>
                }

                <p className="auth__text">Or login with</p>

                <div className="flex gap-3 auth__social-container">
                    <Button classAdd='rounded-[3px]' info={<span className="auth__social-data">
                        <img src="./images/Facebook_logo_(square).png" className="auth__icon facebook"/> <span>Facebook</span> 
                    </span>} />
                    <Button classAdd='rounded-[3px]' 
                        info={
                            <span className="auth__social-data">
                                <img src="./images/Google_Icons-09-512.png" className="auth__icon"/> 
                                <span>
                                    <span className="google1">G</span>
                                    <span className="google2">o</span>
                                    <span className="google3">o</span>
                                    <span className="google1">g</span>
                                    <span className="google4">l</span>
                                    <span className="google2">e</span>
                                </span>
                            </span>
                        } />
                </div>

                { isLoginView ? 
                    <p className="auth__text auth__text--link">Not a member? <span onClick={() => setIsLoginView(false)}>Register here</span></p> :
                    <p className="auth__text auth__text--link">Already have an account? <span onClick={() => setIsLoginView(true)}>Login here</span></p>            
                }

            </div>
        </section>
    )
}