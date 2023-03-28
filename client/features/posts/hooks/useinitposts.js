import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { _getPosts } from '@/store/posts/postThunks'
import { loadedReceived } from '@/store/app/appSlice'

/**
 * Fetch all user's Posts only once during the initial app load (of any <WithCMSAuth> wrapped components)
 * @param {String} uid - Signed-in Firebase user's auth ID
 * @returns {Bool} - Client app's initial load state
 */
export default function useInitPosts (uid) {
  const loaded = useSelector(state => state.app.loaded)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!loaded && uid !== undefined) {
      dispatch(_getPosts(`users/${uid}/posts`))
      dispatch(loadedReceived(true))
    }
  }, [dispatch, uid, loaded])

  return {
    loaded
  }
}