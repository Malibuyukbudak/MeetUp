import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from './categories/getCategoriesSlice'

import profileReducer from './user/profileSlice'
import loginReducer from './user/loginSlice'

import userEventReducer from './event/userEventSlice'
import allEventReducer from './event/allEventSlice'
import getEventReducer from './event/getEventSlice'
import deleteEventReducer from './event/deleteEvenSlice'
import updateEventReducer from './event/updateEventSlice'

import userJoinedEventReducer from './join/userJoinedEventSlice'
import deleteJoinEventReducer from './join/deleteJoinSlice'
import createJoinEventReducer from './join/createJoinSlice'

import userFavoriteEventReducer from './favorite/userFavoriteEventSlice'
import createFavoriteReducer from './favorite/createFavoriteSlice'
import deleteFavoriteReducer from './favorite/deleteFavoriteSlice'


export default configureStore({
    reducer: {
        categories: categoriesReducer,
        profile: profileReducer,
        userEvent: userEventReducer,
        userJoinedEvent: userJoinedEventReducer,
        userFavoriteEvent: userFavoriteEventReducer,
        allEvent: allEventReducer,
        getEvent: getEventReducer,
        login: loginReducer,
        deleteEvent: deleteEventReducer,
        updateEvent: updateEventReducer,
        deleteJoinEvent: deleteJoinEventReducer,
        createJoinEventReducer: createJoinEventReducer,
        createFavorite: createFavoriteReducer,
        deleteFavorite: deleteFavoriteReducer
    }
})