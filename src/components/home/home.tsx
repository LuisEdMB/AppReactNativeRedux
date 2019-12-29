import React, { useEffect, useRef } from 'react'

import { createStackNavigator } from 'react-navigation-stack'
import { styles } from '../../style/style'
import { Icon, Container, Text } from 'native-base'
import { GenerateToken } from '../../services/APIService';

function Home(){
    const didRun = useRef(false);
    useEffect(() => {
        if(!didRun.current){
            GenerateToken();
            didRun.current = true;
        }
    }, [])
    return(
        <Container style={styles.container}>
            <Text>Home Screen</Text>
            <Text>(Go to <Icon name="menu"/> for more options)</Text>
        </Container>
    )
}

export const HomeStackNavigator = createStackNavigator({
    Home:{
        screen: Home
    }
},{
    defaultNavigationOptions: ({navigation}) => {
        return {
            headerTitle: "Home",
            headerLeft: <Icon
                style={styles.menu}
                onPress={() => navigation.openDrawer()}
                name="menu"/>
        }
    }
})