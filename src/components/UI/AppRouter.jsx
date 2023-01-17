import React, { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthContex } from '../../contex'
import { privateRoutes, publicRoutes } from '../../router/routes'
import Loader from './Loader/Loader'

const AppRouter = () => {
    const { isAuth, isLoading } = useContext(AuthContex)

    if (isLoading) {
        return <Loader />
    }

    return (
        isAuth
            ?
            <Routes>
                {privateRoutes.map(route =>
                    <Route
                        key={route.path}
                        path={route.path}
                        element={route.element}
                        exact={route.exact}
                    />
                )}
                <Route
                    exact path="*"
                    element={<Navigate to="/posts" />}
                />
            </Routes>
            :
            <Routes>
                {publicRoutes.map(route =>
                    <Route
                        key={route.path}
                        path={route.path}
                        element={route.element}
                        exact={route.exact}
                    />
                )}

                <Route
                    exact path="*"
                    element={<Navigate to="/login" />}
                />
            </Routes>
    )
}

export default AppRouter