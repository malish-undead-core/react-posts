import React, { useContext } from 'react'
import MyButton from '../components/UI/button/MyButton'
import MyInput from '../components/UI/input/MyInput'
import { AuthContex } from '../contex'

const Login = () => {
    const { isAuth, setIsAuth } = useContext(AuthContex)

    const login = event => {
        event.preventDefault()
        setIsAuth(true)
        localStorage.setItem('auth', 'true')
    }

    return (
        <div>
            <h1>Log in</h1>
            <form onSubmit={login}>
                <MyInput type="text" placeholder="Login" />
                <MyInput type="text" placeholder="Password" />
                <MyButton>Log in</MyButton>
            </form>
        </div>
    )
}

export default Login