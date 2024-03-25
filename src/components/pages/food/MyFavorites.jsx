import { useEffect, useState } from "react"
import api from "../../../utils/api"
import styles from './Dashboard.module.css'
import { RoundedImage } from "../../layout/RoundedImage"
import { Link } from "react-router-dom"

export const MyFavorites = () => {
  const [favorites, setFavorites] = useState([])
  const token = localStorage.getItem('token')

  useEffect(() => {
    api.get('foods/myfavorites/', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then((response) => {
      setFavorites(response.data.foods)
   
    }).catch((err) => {
      console.log(err)
    })
  },[token])
  return(
    <section>
      <div className={styles.foodlist_header}>
        <h1>Meus Favoritos</h1>
      </div>
      <div className={styles.petlist_container}>
        {favorites.length > 0 && favorites.map((favorite) => (
          <div key={favorite._id} className={styles.foodlist_row}>
                <RoundedImage src={`${import.meta.env.VITE_REACT_APP_API}images/foods/${favorite.images[0]}`} alt={favorite.name} width={'px75'}/>
                <span className="bold">{favorite.name}</span>
                <div className={styles.actions}>
                  <Link to={`/food/${favorite._id}`}>Mais detalhes</Link>
                </div>
              </div>
        ))}
        {favorites.length === 0 && <p>Ainda não há favoritos.</p>}
      </div>
    </section>
  )
}