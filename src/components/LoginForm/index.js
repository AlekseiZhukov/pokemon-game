import React, {useState} from 'react';
import Input from "./Input";
import s from './style.module.css'


const LoginForm = ({onSubmit}) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [signIn, setSignIn] = useState(true)

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit && onSubmit({
            email,
            password,
            signIn
        })
        setEmail('')
        setPassword('')
    }

    return (
            <form className={s.form} onSubmit={handleSubmit}>
                <Input value={email} type='text' name='email' onChange={e => setEmail(e.target.value)} label='Email' autoComplete='username'/>
                <Input value={password} type='password' name='password' onChange={e => setPassword(e.target.value)} label='Password'  autoComplete="current-password"/>
                <button >{signIn ? 'SIGNIN' : 'SIGNUP'}</button>
                <span onClick={() => setSignIn(!signIn)} >{signIn ? 'Register?' : 'Login?'}  </span>
            </form>
        );
};

export default LoginForm;