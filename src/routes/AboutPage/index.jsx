import React from "react";
import s from './style.module.css'
import {useHistory} from "react-router-dom";

const AboutPage = () => {
    const history = useHistory()
    return (
        <>

            <div className={s.root}>
                <h1>
                    This is About Page!!!
                </h1>

                <div>
                    <button onClick={ () => history.push('/')}>return Home Page</button>
                </div>
            </div>
        </>
    )
}

export default AboutPage