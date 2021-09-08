import s from './style.module.css'

const Layout = ({title, descr, urlBg=false, colorBg=false}) => {
    const layoutStyle = {
        background: urlBg ? `url(${urlBg})` : colorBg,
    }
    return (
        <section style={layoutStyle} className={s.root}>
            <div className={s.wrapper}>
                <article>
                    <div className={s.title}>
                        { title && <h3>{ title }</h3>}
                        <span className={s.separator}/>
                    </div>
                    <div className={`${s.desc} ${s.full}`}>
                        { descr && <p>{ descr }</p>}
                    </div>
                </article>
            </div>
        </section>
    )
}

export default Layout