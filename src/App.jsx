import { Navigate, Routes, Route } from 'react-router-dom';
import Auth from './components/Auth'
import Login from './components/Login'
import SignUp from './components/SignUp'
import TodoList from './components/TodoList';
import NotFound from './components/NotFound';



function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Auth />}>
          <Route path="" element={<Login />} />
          <Route path="sign_up" element={<SignUp />} />
        </Route>
        <Route path="/todo" element={<TodoList />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
