import api from "../../../utils/api"
import styles from './AddFood.module.css'
import  { FoodForm } from '../../form/FoodForm'
import { useParams } from "react-router-dom"

// hooks
import { useFlashMessage } from "../../../hooks/useFlashMessage"
import { useEffect, useState } from "react"

export const EditFood = () => {
    const [food, setFood] = useState({})
    const token = localStorage.getItem('token')
    const { setFlahMessage } = useFlashMessage()
    const { id } = useParams()
   
    useEffect(() => {
        api.get(`foods/${id}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((response) => {
            
            setFood(response.data.food)
        }).catch((err) => {
            console.log(err)
        })
    },[token, id])

   async function updateFood(food){
    let msgType = 'success'

    const formData = new FormData()

         Object.keys(food).forEach((key) => {
            if(key === 'images'){
              for(let i = 0; i < food[key].length; i++){
                formData.append('images', food[key][i] )
              }
            }else{
               formData.append(key, food[key])
            }
          })

     const data = await api.patch(`foods/${food._id}`, formData, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => {
            return response.data
        }).catch((err) => {
            msgType = 'error'
            return err.response.data
        })

        setFlahMessage(data.message, msgType)

   }
    return (
        <section>
            <div className={styles.addFood_header}>
                <h1>Editando a Receita: {food.name}</h1>
                <p>Depois da edição os dados serão atualizados no sistema</p>
               {food.name && (
                <FoodForm btnText={'Atualizar'} foodData={food} handleSubmit={updateFood} />
               )}
            </div>
        </section>
    )
} 