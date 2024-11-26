import { useContext } from "react";
//context
import { DocumentContext } from "../../Contexts/DocumentContext";
//------------------------------------------------------------

const useDocument = ()=> {
    return useContext(DocumentContext);
}

export default useDocument;