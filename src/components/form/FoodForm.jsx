import { useState } from 'react'
import { Input } from '../form/Input'
import stylesForm from './Form.module.css'


// eslint-disable-next-line react/prop-types
export const FoodForm = ({handleSubmit, btnText, foodData}) => {
    const [food, setFood] = useState(foodData || {})
    const [preview, setPreview] = useState([])
    function onFileChange(e){
      setPreview([...e.target.files])
      setFood({...food, images: [...e.target.files] })
      
    }
    function handleOnChange(e){
      setFood({...food, [e.target.name]: e.target.value})
    }

    function onSubmit(e){
      e.preventDefault()
      handleSubmit(food)
    }
  return (
    <form onSubmit={onSubmit} className={stylesForm.form_container}>
      <div className={stylesForm.preview_food_images}>
        {preview.length > 0 ? preview.map((image, index) => (
          <img src={URL.createObjectURL(image)} alt={food.name} key={image + index} />
        )) : food.images && food.images.map((image, index) => (
          <img src={`${import.meta.env.VITE_REACT_APP_API}images/foods/${image}`} alt={food.name} key={image + index} />
        ))}
      </div>
        <Input text={'Imagens'} type={'file'} name={'images'} handleOnChange={onFileChange}  multiple={true} />
        <Input text={'Nome'} type={'name'} name={'name'} placeholder={'Digite o nome'} handleOnChange={handleOnChange} value={food.name || ''} />
        <Input text={'Igredientes'} type={'text'} name={'ingredients'} placeholder={'Digite os igredientes'} handleOnChange={handleOnChange} value={food.ingredients || ''} />
        <Input text={'Instruções'} type={'text'} name={'instructions'} placeholder={'Digite as instruções'} handleOnChange={handleOnChange} value={food.instructions || ''} />
        <Input text={'Hora'} type={'text'} name={'time'} placeholder={'Digite o tempo de preparo'} handleOnChange={handleOnChange} value={food.time || ''} />
        <Input text={'Porções'} type={'text'} name={'portions'} placeholder={'Digite as porções'} handleOnChange={handleOnChange} value={food.portions || ''} />
        <input type="submit" value={btnText} />
    </form>
  )
}
