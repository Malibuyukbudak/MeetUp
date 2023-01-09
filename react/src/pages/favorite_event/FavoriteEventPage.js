import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { userFavoriteEventThunk } from '../../store/favorite/userFavoriteEventSlice';
import { FavoriteEventPageView } from './FavoriteEventPageView'

export function FavoriteEventPage() {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userFavoriteEventThunk());
  }, [dispatch]);

  return (
    <FavoriteEventPageView></FavoriteEventPageView>
  )
}
