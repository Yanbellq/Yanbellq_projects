import React, { useState, useEffect } from "react";
import useApi from "../services/useApi";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import '../Auth.css';
import Button from "./button";
import FormControl from "./form-control";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { LuLock } from "react-icons/lu";
import { AiOutlineMail } from "react-icons/ai";
import { useGoogleLogin } from "@react-oauth/google";
import { GoogleLogin } from '@react-oauth/google';

export default function Auth() {

    
    const { data, loading, error, request } = useApi();
    
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorResp, setErrorResp] = useState('');
    const [isLoginView, setIsLoginView] = useState(true);
    
    const [token, setToken] = useCookies('self-token');
    const [userName, setUserName] = useCookies('self-name');
    const [userEmail, setUserEmail] = useCookies('self-mail');

    const navigate = useNavigate();

    useEffect(() => {
        if(token['self-token']) navigate('/translate')
    }, [token])

    const loginUser = () => {
        const getToken = async () => {
            try {
                console.log('we around here');
                const resp = await request({ url: '/api/login/', method: 'POST', body: {username, password}, auth: false });
                if(resp && resp.token) {
                    setToken('self-token', resp.token);
                    setUserName('self-name', resp.user.username);
                    setUserEmail('self-mail', (resp.user.email).toString());
                    
                    resp.user.is_superuser ? navigate('/stats') : navigate('/translate')
                }
            } catch {
                console.log('we around there');
                // setErrorResp('Sorry something in server went wrong(');
                // setErrorResp('Sorry, we have some troubles. Wait and then try again')
            }
        }
        getToken()
    }

    useEffect(() => {
        
    }, [errorResp])
    
    const registerUser = () => {
        const register = async () => {
            try {
                const resp = await request({ url: '/api/register/', method: 'POST', body: {username, password, email}, auth: false });
                resp && loginUser();
            } catch (error) {
                setErrorResp('Sorry, we have some troubles. Wait and then try again')
            }
        }
        register()
    }

    const isDisabled = username === '' || password === ''

    const successGoogleLogin = async (tokenResponse) => {
        try {
            const response = await request({
                url: '/api/google-auth/',
                method: 'POST',
                body: { access_token: tokenResponse.access_token },
                auth: false
            });

            if(response && response.token) {
                setToken('self-token', response.token);
                setUserName('self-name', response.user.username);
                setUserEmail('self-mail', response.user.email);
                
                response.user.is_superuser ? navigate('/stats') : navigate('/translate');
            }
        } catch (error) {
            setErrorResp('Google login failed. Please try again.');
        }
    };

    const errorGoogleLogin = () => {
        setErrorResp('Google login failed. Please try again.');
    };

    const googleLogin = useGoogleLogin({
        onSuccess: successGoogleLogin,
        onError: errorGoogleLogin,
    })

    const signInText = 'Google';

    return (
        <section className="auth bg-sky-50 relative">
            <div className="flex flex-col items-center border auth__form bg-white">
                { isLoginView ? <label htmlFor="username" className="auth__title">LOGIN</label> : 
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

                { isLoginView ? null :
                    <FormControl 
                        Label={<AiOutlineMail />}
                        For='email'
                        Id='email'
                        Type='email'
                        Placeholder='Enter your email'
                        Value={email}
                        OnChange={(evt) => setEmail(evt.target.value)}
                        classAddGroup='auth__control bg-gray-200'
                        classAddName='auth__control-title'
                        classAddControl='auth__control-input'
                    /> 
                }
                
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
                    <Button classAdd='rounded-[3px]' 
                        info={
                            <span className="auth__social-data">
                                <img src="./images/Facebook_logo_(square).png" className="auth__icon facebook"/> 
                                <span>Facebook</span> 
                            </span>
                        } 
                    />
                    
                    <Button classAdd='rounded-[3px]' 
                        onClick={() => googleLogin()}
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
{/* 
                <div className="flex gap-3 auth__social-container">
                    <Button classAdd='rounded-[3px]' 
                        info={
                            <span className="auth__social-data">
                                <img src="./images/Facebook_logo_(square).png" className="auth__icon facebook"/> 
                                <span>Facebook</span> 
                            </span>
                        } 
                    />
                    
                    <GoogleLogin
                        onSuccess={successGoogleLogin}
                        onError={errorGoogleLogin}
                        useOneTap
                        shape="rectangular"
                        size="medium"
                        width="200"
                        theme="outline"
                        locale="english"
                        text="signin"
                    />
                </div> */}

                { isLoginView ? 
                    <p className="auth__text auth__text--link">Not a member? <span onClick={() => setIsLoginView(false)}>Register here</span></p> :
                    <p className="auth__text auth__text--link">Already have an account? <span onClick={() => setIsLoginView(true)}>Login here</span></p>            
                }

            </div>
            <span className="absolute bottom-5 right-10 px-7 py-3 bg-white rounded-xl border border-gray-200 text-lg" >{ error }</span>
        </section>
    )
}