import { Link } from "react-router-dom"
import logo from '../../assets/img/logo.png'
import styles from './Navbar.module.css'

// context
import { Context } from "../../context/UserContext"
import { useContext } from "react"

export const Navbar = () => {
    const  { authenticated, logout } = useContext(Context)
    return (
        <nav className={styles.navbar}>
            <div className={styles.navbar_logo}>
                <img src={logo} alt="We Food" />
                <h2>WeFood</h2>
            </div>
            <ul>
                <li>
                    <Link to={'/'}>Receitas</Link>
                </li>
                {authenticated ? 
                <> 
                <li ><Link to={'/food/myfoods'}>Minhas receitas</Link></li>
                <li ><Link to={'/food/myfavorites'}>Meus favoritos</Link></li>
                <li ><Link to={'/user/profile'}>Perfil</Link></li>
                <li onClick={logout}>Sair</li>
                </>: 
                <>
                <li>
                    <Link to={'/login'}>Entrar</Link>
                </li>
                <li>
                    <Link to={'/register'}>Cadastrar</Link>
                </li>
                </>}
            </ul>
        </nav>
    )
}