import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCategoriesThunk } from '../../store/categories/getCategoriesSlice';
import { createEventThunk } from '../../store/event/createEventSlice';
import CreatedEventPageView from './CreatedEventPageView'

export function CreatedEventPage() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCategoriesThunk());
    }, [dispatch]);


    const createEvent = async (values, { resetForm }) => {
        dispatch(createEventThunk(values)).then(() => navigate("/MyCreatedEvent"))
        resetForm();
    }

    return (
        <CreatedEventPageView createEvent={createEvent}></CreatedEventPageView>
    )
}

