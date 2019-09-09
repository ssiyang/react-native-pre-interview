import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { createAppContainer } from 'react-navigation'

import { createStackNavigator } from 'react-navigation-stack'

import Home from './home';
import BookDetail from './bookDetail';

export default class Route extends Component {
    render() {
        return (
            <AppContainer />
        )
    }
}

const homeNavigator = createStackNavigator({
    Home: {
        screen: Home,
        
    },
    BookDetail: {
        screen: BookDetail,
        navigationOptions: ({ navigation }) => ({
            title: `${navigation.state.params.title}`
          }),
    }

},
    {
        initialRouteName: 'Home',
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: 'white',
            },
            headerTintColor: '#0288D1',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        },
    }

)

const AppContainer = createAppContainer(homeNavigator)
