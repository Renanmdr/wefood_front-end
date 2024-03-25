import { useEffect, useState } from "react"
import api from '../../utils/api'
import styles from './Home.module.css'
import { Link } from 'react-router-dom'


export const Home = () => {
    const [foods, setFoods] = useState([])

    useEffect(() => {
      api.get('foods/').then((response) => {
        setFoods(response.data.foods)
      }).catch((err) => {
        console.log(err)
      })
    },[])
    return (
        <section>
            <div className={styles.food_home_header}>
                <h1>Receitas</h1>
            </div>
            <div className={styles.food_container }>
                {foods.length > 0 && foods.map((food) => (
                <div key={food._id} className={styles.food_card}>
                    {/* <div style={{backgroundImage: `url(${import.meta.env.VITE_REACT_APP_API}images/foods/${food.images[0]})`}} className={styles.food_card_image}></div> */}
                    <img src={`${food.images[0]}`} alt={food.name} className={styles.food_card_image} />
                    <h3>{food.name}</h3>
                    <p>Por <span style={{color: 'blue'}}>{food.user.name}</span></p>
                    <Link to={`/food/${food._id}`}>Mais detalhes</Link>
                </div>
            ))}
            {foods.length === 0 && <p>Não há receitas cadastradas no momento!</p>}
            </div>
        </section>
    )
}