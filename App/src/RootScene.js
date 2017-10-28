/**
 * Created by 叶子 on 2017/8/20.
 */
import {React,Image, Component } from 'react';
import { View } from 'react-native';

import { TabNavigator, StackNavigator, TabBarBottom } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import MyMusic from './components/MyMusic.js';
const Tab = TabNavigator(
    {
        // DiscoverMusic: {
        //     screen:  DiscoverMusic,
        //     navigationOptions: ({navigation}) => ({
        //         tabBarLabel: '发现音乐',
        //         tabBarIcon: ({ focused, tintColor }) => (
        //             <Icon name="ios-disc-outline" size={30} color={tintColor} />
        //         )
        //     })
        // },
        MyMusic: {
            screen: MyMusic,
            navigationOptions: ({navigation}) => ({
                tabBarLabel: '我的音乐',
                tabBarIcon: ({ focused, tintColor }) => (
                    <Icon name="ios-musical-notes-outline" size={30} color={tintColor} />
                )
            })
        },
        // Friends: {
        //     screen: Friends,
        //     navigationOptions: ({navigation}) => ({
        //         tabBarLabel: '朋友',
        //         tabBarIcon: ({ focused, tintColor }) => (
        //             <Icon name="ios-contacts-outline" size={30} color={tintColor} />
        //         )
        //     })
        // },
        // Account: {
        //     screen: Account,
        //     navigationOptions: {
        //         tabBarLabel: '账号',
        //         tabBarIcon: ({ focused, tintColor }) => (
        //             <Icon name="ios-person-outline" size={30} color={tintColor} />
        //         )
        //     }
        // }
    },
    {
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        swipeEnabled: true,
        animationEnabled: true,
        initialRouteName: 'MyMusic',
        lazy: true,
        tabBarOptions: {
            activeTintColor: '#ffffff',
            inactiveTintColor: '#cccccc',
            style: {
                backgroundColor: '#333333'
            }
        }
    }
);

const Navigator = StackNavigator(
    {
        Tab: { screen: Tab},
    },
    {
        navigationOptions: {
            headerBackTitle: '返回',
            headerTintColor: '#333333',
            showIcon: true
        }
    }
);

class RootScene extends Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Navigator />
            </View>
        )
    }
}

export default RootScene;