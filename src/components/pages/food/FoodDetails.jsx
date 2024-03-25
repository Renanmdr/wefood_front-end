import { useEffect, useState } from "react"
import api from "../../../utils/api"
import { Link, useParams } from "react-router-dom"
import styles from './FoodDetails.module.css'
import { useFlashMessage } from "../../../hooks/useFlashMessage"


export const FoodDetails = () => {
    const [food, setFood] = useState({})
    const { id } = useParams()
    const token = localStorage.getItem('token')
    const { setFlahMessage } = useFlashMessage()
    

    useEffect(() => {
        api.get(`foods/${id}`).then((response) => {
            setFood(response.data.food)
        }).catch((err) => {
            console.log(err)
        })
    },[id])

    async function favorite(){
        let msgType = 'success'

        const data = await api.patch(`foods/favorite/${food._id}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((response) => {
            return response.data
        }).catch((err) => {
            msgType = 'error'
            return err.response.data
        })

        setFlahMessage(data.message, msgType)
    } 
 return(
   <section className={styles.food_details_container}>
        {food.name && (<>
        <div className={styles.food_details_header}>
            <h1>FoodDetails</h1>
            <h2>{food.name}</h2>
        </div>
        <div className={styles.food_images}>
            {food.images.map((image, i) => (
                <img src={`${import.meta.env.VITE_REACT_APP_API}images/foods/${image}`} alt={food.name} key={image + i} />
            ))}
        </div>
        <p><span className="bold">Ingredientes: </span>{food.ingredients}</p>
        <p><span className="bold">Instruções: </span>{food.instructions}</p>
        <p><span className="bold">Porções: </span>{food.portions}</p>
        <p><span className="bold">Tempo: </span>{food.time}</p>
        {token ? <button onClick={favorite}>Favoritar</button> : <p>Você precisa <Link to={'/register'}>Criar uma conta</Link> para favoritar uma receita</p>}
       
        </>
        )}
   </section>
 )
}