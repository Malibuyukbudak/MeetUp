import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { MyEventPageView } from "./MyEventPageView";
import { getCategoriesThunk } from '../../store/categories/getCategoriesSlice';
import { userEventThunk } from "../../store/event/userEventSlice";
import { deleteEventThunk } from "../../store/event/deleteEvenSlice";
import { updateEventThunk } from "../../store/event/updateEventSlice";


export function MyEventPage() {
  const dispatch = useDispatch();

  let deleteEvent = async (id) => {
    dispatch(deleteEventThunk(id))
  }
  let updateEvent = async (id, values) => {
    dispatch(updateEventThunk(id, values))
  }
  useEffect(() => {
    dispatch(getCategoriesThunk());
  }, [dispatch]);

  useEffect(() => {
    dispatch(userEventThunk());
  }, [dispatch]);

  return (
    <MyEventPageView
      deleteEvent={deleteEvent}
      updateEvent={updateEvent}
    >
    </MyEventPageView>
  )
}

