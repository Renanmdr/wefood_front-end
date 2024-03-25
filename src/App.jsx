import { BrowserRouter, Routes, Route} from 'react-router-dom'

// components
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { Container } from './components/layout/Container'
import { Message } from './components/layout/Messsage'
import { Profile } from './components/pages/user/Profile'

// pages
import { Home } from './components/pages/Home'
import { Register } from './components/pages/auth/Register'
import { Login } from './components/pages/auth/Login'


// context
import { UserProvider } from './context/UserContext'
import { MyFoods } from './components/pages/food/MyFoods'
import { AddFood } from './components/pages/food/AddFood'
import { EditFood } from './components/pages/food/EditFood'
import { FoodDetails } from './components/pages/food/FoodDetails'
import { MyFavorites } from './components/pages/food/MyFavorites'

function App() {


  return (
    <BrowserRouter>
    <UserProvider>
      <Navbar />
      <Message />
      <Container>
        <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/user/profile' element={<Profile />} />
        <Route path='/food/myfoods' element={<MyFoods />} />
        <Route path='/food/add' element={<AddFood />} />
        <Route path='/food/edit/:id' element={<EditFood />} />
        <Route path='/food/myfavorites' element={<MyFavorites />} />
        <Route path='/food/:id' element={<FoodDetails />} />
      </Routes>
    </Container>
    <Footer />
    </UserProvider>
    </BrowserRouter>
  )
}

export default App
