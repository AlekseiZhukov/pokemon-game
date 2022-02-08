import React, {useEffect} from 'react'
import {useLocation, Route, Switch, Redirect} from 'react-router-dom'
import cn from 'classnames'
import {NotificationContainer} from 'react-notifications';
import HomePage from "./routes/Home"
import GamePage from "./routes/Game"
import NotFoundPage from "./routes/NotFound"
import MenuHeader from "./components/MenuHeader"
import Footer from "./components/Footer"
import AboutPage from "./routes/AboutPage"
import ContactPage from "./routes/ContactPage"
import {FireBaseContext} from "./context/farebaseContext";
import FirebaseClass from "./service/firebase";
import './App.css'
import 'react-notifications/lib/notifications.css';
import s from './style.module.css'
import PrivateRoute from "./components/PrivateRoute";
import {useDispatch, useSelector} from "react-redux";
import {getUserAsync, selectDataUserIsLoading} from "./store/user";
import User from "./routes/User";



const App = () => {
    const isUserLoading = useSelector(selectDataUserIsLoading)
    const location = useLocation('/')
    const isPadding = location.pathname === '/' || location.pathname === '/game/board'
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUserAsync())
    }, [dispatch])

    if (isUserLoading) {
        return <h1>LOADING...</h1>
    }

    return (
        <FireBaseContext.Provider value = {FirebaseClass}>
            <Switch>
                <Route path="/404" render={() => <NotFoundPage />} />
                <Route>
                    <>
                        <MenuHeader bgActive={!isPadding}/>
                        <div className={cn(s.wrap, {
                            [s.isHomePage]: isPadding
                        })}>
                            <Switch>
                                <Route path="/" exact component={HomePage} />
                                <PrivateRoute path="/game" component={GamePage} />
                                <Route path="/about" component={AboutPage} />
                                <Route path="/contact" component={ContactPage} />
                                <PrivateRoute path="/user" component={User} />
                                <Route render={() => (
                                    <Redirect to={"/404"}/>
                                )} />

                            </Switch>
                        </div>
                        <Footer />

                    </>
                </Route>

            </Switch>
            <NotificationContainer />
        </FireBaseContext.Provider>
    )
}
export default App

