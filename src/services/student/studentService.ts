import { ExecuteRequest } from "../APIService";
import studentType from '../../types/student';

export default class StudentService{
    static async getStudents(){
        return ExecuteRequest({
            url: "alumnos",
            method: "get",
            body: null
        }).then(response => response.Datos);
    }
    static async getStudent(idStudent:number){
        return ExecuteRequest({
            url: "alumnos/" + idStudent.toString(),
            method: "get",
            body: null
        }).then(response => response.Datos);
    }
    static async saveStudent(student:studentType){
        return ExecuteRequest({
            url: "alumnos",
            method: "post",
            body: student
        }).then(response => response.Datos);
    }
    static async modifyStudent(student:studentType){
        return ExecuteRequest({
            url: "alumnos",
            method: "patch",
            body: student
        }).then(response => response.Datos);
    }
    static async inactivateStudent(idStudent:number){
        return ExecuteRequest({
            url: "alumnos/" + idStudent.toString(),
            method: "patch",
            body: null
        }).then(response => response.Datos)
    }
}