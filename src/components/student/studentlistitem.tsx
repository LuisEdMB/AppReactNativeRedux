import React from 'react'
import { Card, CardItem, Left, Body, Text, Right, Button, Icon } from 'native-base';
import { styles } from '../../style/style';
import { connect } from 'react-redux'
import StudentService from '../../services/student/studentService';
import * as actions from '../../actions/student'
import { StateObject } from '../../utils/stateObject';

function StudentListItem(props){
    const GetStudent = (idStudent:number) => {
        StudentService.getStudent(idStudent).then(student => {
            props.setStudent(student);
            props.setPropertyStudent("EstadoObjeto",StateObject.Modify);
            props.navigation.navigate("StudentForm");
        })
    }
    const InactivateStudent = (idStudent:number) => {
        StudentService.inactivateStudent(idStudent).then(response => {
            StudentService.getStudents().then(students => {
                props.listStudents(students);
            })
        })
    }
    return(
        <Card style={styles.card}>
            <CardItem>
              <Left>
                <Body>
                    <Text>{props.NombreAlumno} {props.ApellidoAlumno}</Text>
                    <Text note>Was born on: {props.FechaNacimiento}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Right style={styles.positionButtonsCard}>
                <Button transparent style={styles.tamanioButtonsCard} onPress={() => InactivateStudent(props.CodigoAlumno)}>
                  <Icon active name="remove-circle" style={{color: 'red'}}/>
                </Button>
                <Button transparent style={styles.tamanioButtonsCard} onPress={() => GetStudent(props.CodigoAlumno)}>
                  <Icon active name="build" style={{color: 'orange'}}/>
                </Button>
              </Right>
            </CardItem>
        </Card>
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
        setPropertyStudent: (name, value) => { dispatch(actions.setPropertiesStudentAction(name, value)) },
        setStudent: (student) => { dispatch(actions.setStudentAction(student)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentListItem);