import React from 'react';
import s from './style.module.css';


const Input = ({value, type, required = true, label, name,  onChange, ...props}) => {

    return (
        <div className={s.root}>
            <input
                type={type}
                className={s.input}
                required = {required}
                value={value}
                onChange={event => onChange(event)}
                name={name}
                {...props}

            />
            <span className={s.highlight} />
            <span className={s.bar} />
            <label className={s.label}>{label}</label>
        </div>

    );
};

export default Input;