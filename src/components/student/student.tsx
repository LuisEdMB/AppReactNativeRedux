import React from 'react'
import { createStackNavigator } from "react-navigation-stack";
import { Icon, Container, Fab } from "native-base";
import { styles } from "../../style/style";
import { useRef, useEffect } from "react";
import StudentService from "../../services/student/studentService";
import * as actions from '../../actions/student'
import { connect } from 'react-redux'
import StudentList from './studentlist';
import { studentInitial } from '../../types/student'
import StudentFormContainer from './studentform';

function Student(props){
    const didRun = useRef(false);
    useEffect(() => {
        if(!didRun.current){
            StudentService.getStudents().then(students => {
                props.listStudents(students);
            })
            didRun.current = true;
        }
    },[])
    return(
        <Container style={styles.container}>
            <StudentList {...props}/>
            <Fab
               position="bottomRight"
               style={{ backgroundColor: "#5067FF" }}
               onPress={() => {
                    props.setStudent(studentInitial);
                    return props.navigation.navigate("StudentForm");
               }}
            >
                <Icon name="add" />
            </Fab>
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
        setStudent: (student) => { dispatch(actions.setStudentAction(student)) }
    }
}

const StudentContainer = connect(mapStateToProps, mapDispatchToProps)(Student);

export const StudentStackNavigator = createStackNavigator({
    Student:{
        screen: (navigation) => <StudentContainer {...navigation}/>,
        navigationOptions: ({navigation}) => {
            return{
                headerTitle: "Maint. Students",
                headerLeft: <Icon
                    style={styles.menu}
                    onPress={() => navigation.openDrawer()}
                    name="menu"/>
            }
        }
    },
    StudentForm:{
        screen: (navigation) => <StudentFormContainer {...navigation}/>,
        navigationOptions: ({navigation}) => {
            return{
                headerTitle: "New/Modify Student",
                headerBackTitle: "Back"
            }
        }
    }
})