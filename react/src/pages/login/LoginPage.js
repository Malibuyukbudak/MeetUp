import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { loginThunk } from '../../store/user/loginSlice';
import { LoginPageView } from './LoginPageView'

export function LoginPage() {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let login = async (values) => {
    dispatch(loginThunk(values))
      .then((res) => {
        res.payload.isSuccess ? navigate("/") : navigate('/login')
      })
  }

  return (
    <LoginPageView submit={login}></LoginPageView>
  )
}
