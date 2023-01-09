import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { allEventThunk } from '../../store/event/allEventSlice';
import { HomePageView } from './HomePageView'


export function HomePage() {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(allEventThunk());
  }, [dispatch]);
  
  return (
    <HomePageView></HomePageView>
  )
}

