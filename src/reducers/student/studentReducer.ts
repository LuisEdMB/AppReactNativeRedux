import studentType, { studentInitial } from '../../types/student'
import { LIST_STUDENT, SET_PROPERTY_STUDENT, SET_STUDENT } from '../../const/student'

const INITIAL_STATE = {
    students: Array<studentType>(),
    student: studentInitial
}

export function studentReducer(state = INITIAL_STATE, action){
    switch (action.type) {
        case LIST_STUDENT:
            return{
                ...state, students: action.payload
            }
        case SET_PROPERTY_STUDENT:
            const student = {
                ...state.student, [action.name]:action.value
            }
            return{
                ...state, student: student
            }
        case SET_STUDENT:
            return{
                ...state, student: action.payload
            }
        default:
            return state;
    }
}