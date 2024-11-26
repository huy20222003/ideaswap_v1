import { useContext } from "react";
//context
import { NotificationContext } from "../../Contexts/NotificationContext";
//------------------------------------------------------------

const useNotification = ()=> {
    return useContext(NotificationContext);
}

export default useNotification;