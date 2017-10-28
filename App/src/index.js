import React, {Component} from 'react';
import {
    View,
    Platform,
    StatusBar,
    BackHandler,
    ToastAndroid,
    AppState
} from 'react-native';
import { TabNavigator } from 'react-navigation';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tab:'home'
        };
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <TabNavigator
                    tabBarStyle={{ height: 60 }}
                    style={{ flex: 1 }}>
                    <TabNavigator.Item
                        title="home"
                        selected={this.state.tab == 'home'}
                        onPress={() => this.setState({ tab: 'home' })}
                        badgeText="122"
                        renderIcon={() => <Image
                            style={{ width: 40, height: 33 }}
                            source={require('../img/chat.png')}></Image>}
                    >
                        {home}
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        title="second"
                        selected={this.state.tab == 'second'}
                        onPress={() => this.setState({ tab: 'second' })}
                        renderIcon={() => <Image
                            style={{ width: 40, height: 33 }}
                            source={require('../img/contact.png')}></Image>}
                    >
                        {second}
                    </TabNavigator.Item>
                </TabNavigator>
            </View>
        );
    }
}