import { useContext } from "react";
//context
import { CourseContext } from "../../Contexts/CourseContext";
//------------------------------------------------------------

const useCourse = ()=> {
    return useContext(CourseContext);
}

export default useCourse;