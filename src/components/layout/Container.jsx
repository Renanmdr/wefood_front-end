import styles from './Container.module.css'

// eslint-disable-next-line react/prop-types
export const Container = ({children}) => {
    return (
        <main className={styles.container}>
            {children}
        </main>
    )
}