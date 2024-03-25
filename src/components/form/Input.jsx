import styles from './Input.module.css'

// eslint-disable-next-line react/prop-types
export const Input = ({name, value, type, text, placeholder, handleOnChange, multiple}) => {
    return(
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}:</label>
            <input type={type} placeholder={placeholder} value={value} name={name} id={name} onChange={handleOnChange} {...(multiple ? {multiple} : '')} />
        </div>
    )
}