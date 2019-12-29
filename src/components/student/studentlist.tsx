import React from 'react'
import { Container, Content } from 'native-base';
import studentType from '../../types/student'
import StudentListItem from './studentlistitem';
import { connect } from 'react-redux'

function StudentList(props){
    return(
        <Container>
            <Content>
                {
                    props.student.students.map((student:studentType) => {
                        return(
                            <StudentListItem key={student.CodigoAlumno} {...student} {...props}/>
                        )
                    })
                }
            </Content>
        </Container>
    );
}

function mapStateToProps(state){
    return{
        student: state.student
    }
}

export default connect(mapStateToProps)(StudentList);