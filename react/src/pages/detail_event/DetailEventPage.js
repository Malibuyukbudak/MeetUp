import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom'
import { createFavoriteThunk } from '../../store/favorite/createFavoriteSlice';
import { createJoinThunk } from '../../store/join/createJoinSlice';
import { deleteFavoriteThunk } from '../../store/favorite/deleteFavoriteSlice';
import { deleteJoinThunk } from '../../store/join/deleteJoinSlice';
import { getEventThunk } from '../../store/event/getEventSlice';
import DetailEventPageView from './DetailEventPageView'

export function DetailEventPage() {

  const { id } = useParams()
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEventThunk(id))
  }, [dispatch, id]);

  let postFavorite = async () => {
    dispatch(createFavoriteThunk(id))
  }

  let postJoin = async () => {
    dispatch(createJoinThunk(id))
  }

  let deleteFavorite = async () => {
    dispatch(deleteFavoriteThunk(id))
  }

  let deleteJoin = async () => {
    dispatch(deleteJoinThunk(id))
  }

  return (
    <div>
      <DetailEventPageView id={id}
        createFavorite={postFavorite} deleteFavorite={deleteFavorite}
        createJoin={postJoin} deleteJoin={deleteJoin}
      ></DetailEventPageView>
    </div>
  )
}

