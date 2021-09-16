import React from 'react';
import {useHistory} from 'react-router-dom'
import teamRocket from './asset/teamRocket.png';
import s from './NotFound.module.css';


const NotFoundPage = () => {
    const history = useHistory()


  return (
      <>

        <div className={s.root}>
          <div className={s.contentWrap}>
            <p className={s.text404}>
              404
            </p>
            <img src={teamRocket} alt="rocket team" className={s.img} />
            <p className={s.string}>
              The rocket team has won this time.
            </p>
            <button onClick={() => history.push("/")}>return home</button>
          </div>
        </div>
      </>
  )
}

export default NotFoundPage;
