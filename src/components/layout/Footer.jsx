import styles from './Footer.module.css'

export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <p>
                <span className="bold">WeFood</span> &copy; 2024
            </p>
        </footer>
    )
}