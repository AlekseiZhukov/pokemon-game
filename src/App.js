import React from 'react'
import {useLocation, Route, Switch, Redirect} from 'react-router-dom'
import cn from 'classnames'
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
import s from './style.module.css'



const App = () => {

    const location = useLocation('/')
    const isPadding = location.pathname === '/' || location.pathname === '/game/board'

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
                            <Route path="/game" component={GamePage} />
                            <Route path="/about" component={AboutPage} />
                            <Route path="/contact" component={ContactPage} />
                            <Route render={() => (
                                <Redirect to={"/404"}/>
                            )} />

                        </Switch>
                    </div>
                    <Footer />

                </>
            </Route>

        </Switch>
        </FireBaseContext.Provider>
    )
}
export default App

