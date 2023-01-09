import { useEffect } from 'react';
import ProfilePageView from './ProfilePageView'
import { profileThunk } from '../../store/user/profileSlice';
import { useDispatch } from 'react-redux';


export function ProfilePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(profileThunk());
  }, [dispatch]);


  return (
    <ProfilePageView></ProfilePageView>
  )
}
