import bus from '../utils/bus'

export const useFlashMessage = () => {

    function setFlahMessage(msg, type){
        bus.emit('flash', {
            message: msg,
            type: type
        })
    }

    return {setFlahMessage}
}