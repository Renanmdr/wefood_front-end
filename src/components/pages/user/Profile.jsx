import { useEffect, useState } from "react"
import { Input } from "../../form/Input"
import Formstyles from '../../form/Form.module.css'
import styles from './Profile.module.css'
import api from "../../../utils/api"
import { useFlashMessage } from "../../../hooks/useFlashMessage" 
import { RoundedImage } from "../../layout/RoundedImage"
//const {name, email, password, confirmpassword} = req.body

      //let image = ''

export const Profile = () => {
    const [user, setUser] = useState({})
    const [preview, setPreview] = useState()
    const token = localStorage.getItem('token')
    const { setFlahMessage } = useFlashMessage()

    useEffect(() => {
      api.get('users/checkuser', {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`
        }
      }).then((response) => {
        setUser(response.data)
      })
    },[token])

    function handleOnChange(e){
   
      setUser({...user, [e.target.name]: e.target.value })
    }

    function onFileChange(e){
      setUser({...user, [e.target.name]: e.target.files[0]})
      setPreview(e.target.files[0])
      
    }

   async function handleSubmit(e){
        e.preventDefault()

        let msgTpe = 'success'

        const formData = new FormData()

         Object.keys(user).forEach((key) => {
          formData.append(key, user[key])
        })
       
        const data = await api.patch(`users/edit/${user._id}`, formData, {
           headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
            'Content-Type': 'multipart/form-data'
           }
        }).then((response) => {
          return response.data
        }).catch((error) => {
          msgTpe = 'error'
          return error.response.data
        })
        

        setFlahMessage(data.message, msgTpe)
    }
  return (
    <section className={Formstyles.form_container} >
       <div className={styles.profile_header}>
         <h1>Perfil</h1>
         {(user.image || preview) && (<RoundedImage  src={preview ? URL.createObjectURL(preview) : `${import.meta.env.VITE_REACT_APP_API}images/users/${user.image}`} alt={user.name} />)}
       </div>
        <form onSubmit={handleSubmit}>
            <Input text={'Imagem'} type={'file'} name={'image'} handleOnChange={onFileChange}  />

            <Input text={'Nome'} type={'text'} name={'name'} handleOnChange={handleOnChange} value={user.name || ''}  placeholder={'Digite seu nome'}  />

            <Input text={'E-mail'} type={'email'} name={'email'} handleOnChange={handleOnChange} value={user.email || ''}  placeholder={'Digite seu e-mail'}  />

            <Input text={'Senha'} type={'password'} name={'password'} handleOnChange={handleOnChange}   placeholder={'Digite sua senha'}  />

            <Input text={'Confirmação de senha'} type={'password'} name={'confirmpassword'} handleOnChange={handleOnChange}  placeholder={'Digite sua senha'}  />

            <input type="submit" value="Editar" />
        </form>
    </section>
  )
}

