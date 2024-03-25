import { FoodForm } from '../../form/FoodForm'
import styles from './AddFood.module.css'
import { useNavigate } from 'react-router-dom'
import api from '../../../utils/api'

// hooks
import { useFlashMessage } from '../../../hooks/useFlashMessage'
export const AddFood = () => {
  const token = localStorage.getItem('token')
  const { setFlahMessage } = useFlashMessage()
  const navigate = useNavigate()
  
  async function registerFood(food){
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

  const data = await api.post('foods/create/', formData, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
        'Content-Type': 'multipart/form-data'
        
      }
    }).then((response) => {
      return response.data
    }).catch((err)=> {
      msgType = 'error'
      return err.response.data
    })

    setFlahMessage(data.message, msgType)

    if(msgType !== 'error'){
      navigate('/food/myfoods')

    }
  }
  return (
    <section className={styles.addFood_header}>
        <div>
            <h1>Adicionar Receita</h1>
            <p>Depois ficará disponivel para visualização</p>
        </div>
        <FoodForm btnText={"Adicionar"} handleSubmit={registerFood} />
    </section>
  )
}