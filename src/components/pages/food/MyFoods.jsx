import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import api from "../../../utils/api"
import { RoundedImage } from '../../layout/RoundedImage'
import styles from './Dashboard.module.css'
import { useFlashMessage } from '../../../hooks/useFlashMessage'

export const MyFoods = () => {
    const [foods, setFoods] = useState([])
    const token = localStorage.getItem('token')
    const { setFlahMessage } = useFlashMessage()
    useEffect(() => {
        api.get('foods/myfoods', {
          headers: {
            Authorization: ` Bearer ${JSON.parse(token)}`
          }
        }).then((response) => {
          setFoods(response.data.foods)
         // console.log(response.data)
        }).catch((err) => {
          console.log(err)
        })
    },[token, foods])

   async function removeFood(id){
      let msgType = 'success'

    const data = await api.delete(`foods/${id}`, {
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
  return (
    <section>
        <div className={styles.foodslist_header}>
            <h1>Minhas receitas</h1>
            <Link to={'/food/add'}>Cadastrar Receita</Link>
        </div>
        <div className={styles.foodslist_container}>
            {foods.length > 0 && foods.map((food) => (
              <div key={food._id} className={styles.foodlist_row}>
                <Link to={`/food/${food._id}`}>
                 <RoundedImage src={`${import.meta.env.VITE_REACT_APP_API}images/foods/${food.images[0]}`} alt={food.name} width={'px75'}/>
                 <span className="bold">{food.name}</span>
                </Link>
                <div className={styles.actions}>
                  <Link to={`/food/edit/${food._id}`}>Editar</Link>
                  <button onClick={() => removeFood(food._id)}>Excluir</button>
                </div>
              </div>
            ))}
            {foods.length === 0 && <p>Não há receitas cadastradas</p>}
        </div>
    </section>
  )
}
