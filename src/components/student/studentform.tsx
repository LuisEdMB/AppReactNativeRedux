import React from 'react'
import { connect } from 'react-redux'
import { Container, Content, Form, Item, Label, Input, Text, Button } from 'native-base';
import * as actions from '../../actions/student'
import StudentService from '../../services/student/studentService';
import { StateObject } from '../../utils/stateObject';
import DateTimePicker from '@react-native-community/datetimepicker';

function StudentForm(props){
    const SaveStudent = () => {
        if(props.student.student.EstadoObjeto == StateObject.New){
            StudentService.saveStudent(props.student.student).then(response => {
                props.navigation.navigate("Student");
                GetStudents();
            })
        }
        else{
            StudentService.modifyStudent(props.student.student).then(response => {
                props.navigation.navigate("Student");
                GetStudents();
            })
        }
    }
    const GetStudents = () => {
        StudentService.getStudents().then(students => {
            props.listStudents(students);
        })
    }
    return(
        <Container>
        <Content>
            <Form>
                <Item floatingLabel>
                    <Label>Nombre Alumno:</Label>
                    <Input value={props.student.student.NombreAlumno} onChangeText={value => props.setPropertyStudent("NombreAlumno",value)}/>
                </Item>
                <Item floatingLabel last>
                    <Label>Apellido Alumno:</Label>
                    <Input value={props.student.student.ApellidoAlumno} onChangeText={value => props.setPropertyStudent("ApellidoAlumno",value)}/>
                </Item>
                <Item floatingLabel last>
                    <Label>Edad:</Label>
                    <Input keyboardType="numeric" value={String(props.student.student.Edad)} onChangeText={value => props.setPropertyStudent("Edad",value)}/>
                </Item>
                <Text/><Text/><Text/>
                <Item>
                    <Label>Fecha Nacimiento:</Label>
                </Item>
                <DateTimePicker
                        value={new Date(props.student.student.FechaNacimiento == "" ? Date.now() : props.student.student.FechaNacimiento)}
                        mode={"date"}
                        display="calendar"
                        onChange={(event, value) => props.setPropertyStudent("FechaNacimiento",value)}
                        />
                <Text/><Text/>
                <Button style = {{padding: '10%', alignSelf: 'center'}}
                    onPress={() => SaveStudent()}><Text>Guardar</Text></Button>
            </Form>
        </Content>
      </Container>
    );
}

function mapStateToProps(state){
    return{
        student: state.student
    }
}

function mapDispatchToProps(dispatch){
    return{
        listStudents: (students) => { dispatch(actions.listStudentAction(students)) },
        setPropertyStudent: (name, value) => { dispatch(actions.setPropertiesStudentAction(name, value)) }
    }
}

const StudentFormContainer = connect(mapStateToProps, mapDispatchToProps)(StudentForm);

export default StudentFormContainer;