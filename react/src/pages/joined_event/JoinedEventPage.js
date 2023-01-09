import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { userJoinedEventThunk } from '../../store/join/userJoinedEventSlice';
import JoinedEventPageView from './JoinedEventPageView'

export function JoinedEventPage() {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userJoinedEventThunk());
  }, [dispatch]);

  return (
    <JoinedEventPageView ></JoinedEventPageView>
  )
}

