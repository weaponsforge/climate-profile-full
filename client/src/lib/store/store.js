import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import { USER_STATES } from '@/features/authentication'

// Reducers
import appReducer from '@/store/app/appSlice'
import postsReducer from '@/store/posts/postSlice'
import cardsReducer from '@/store/cards/cardSlice'
import cardGalleryReducer from '@/store/cards_gallery/cardGallerySlice'
import userReducer from '@/store/user/userSlice'

const combinedReducer = combineReducers({
  app: appReducer,
  posts: postsReducer,
  cards: cardsReducer,
  cards_gallery: cardGalleryReducer,
  user: userReducer
})

const rootReducer = (state, action) => {
  if (state && state?.user?.authStatus === USER_STATES.SIGNED_OUT) {
    // Clear all store data on user sign-out
    state = undefined
  }

  return combinedReducer(state, action)
}

export const store = configureStore({
  reducer: rootReducer
})
