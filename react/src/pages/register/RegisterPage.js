import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerThunk } from '../../store/user/registerSlice';
import { RegisterPageView } from './RegisterPageView'

export function RegisterPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    let register = async (values) => {
        dispatch(registerThunk(values))
        navigate("/login")
    }
    return (
        <RegisterPageView submit={register}></RegisterPageView>
    )
}
