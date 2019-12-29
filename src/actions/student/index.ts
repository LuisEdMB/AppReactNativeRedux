import studentType from '../../types/student'
import { LIST_STUDENT, SET_PROPERTY_STUDENT, SET_STUDENT } from '../../const/student'

export const listStudentAction = (students:Array<studentType>) => {
    return{
        type: LIST_STUDENT,
        payload: students
    }
}

export const setPropertiesStudentAction = (name:any, value:any) => {
    return{
        type: SET_PROPERTY_STUDENT,
        name: name,
        value: value
    }
}

export const setStudentAction = (student:studentType) => {
    return{
        type: SET_STUDENT,
        payload: student
    }
}