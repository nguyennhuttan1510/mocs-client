import { useDispatch } from 'react-redux'

const useDispatchAction = () => {
    const dispatch = useDispatch()
    const dispatchAction = (action, value, callback = () => {}) => {
        const payload = {
            params: value,
            callback,
        }
        dispatch({ type: action ?? 'SINGLE-REQUEST', payload: payload })
    }
    return dispatchAction
}
export default useDispatchAction
