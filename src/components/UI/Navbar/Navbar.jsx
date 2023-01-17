import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContex } from '../../../contex'
import MyButton from '../button/MyButton'

const Navbar = () => {
    const router = useNavigate()
    const { isAuth, setIsAuth } = useContext(AuthContex)
    const logout = () => {
        setIsAuth(false)
        localStorage.removeItem('auth')
    }

    return (
        <div className="navbar">
            <MyButton onClick={logout}>
                Log out
            </MyButton>
            <div className="navbar__links">
                <MyButton onClick={() => router("/about")}>About</MyButton>
                <MyButton onClick={() => router("/posts")}>Posts</MyButton>
                <MyButton onClick={() => router("/login")}>Log in</MyButton>
            </div>
        </div >
    )
}

export default Navbar