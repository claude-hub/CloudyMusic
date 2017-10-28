/**
 * Created by mac on 2017/4/25.
 */
import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Image,
    Dimensions,
    Platform,
    Text,
    TouchableOpacity
} from 'react-native';
// import {Config} from '../../lib';
import HomePage from '../HomePage';
import PersonalPage from '../PersonalPage';
import AnswerPage from '../AnswerPage';

export default class FooterNav extends Component {
    constructor(props) {
        super(props);
    }

    changeToHomePage() {
        if (this.props.routeName != '首页')
            this.props.replaceCurrent('首页', HomePage, {...this.props});
    }

    changeToInfo() {
        if (this.props.routeName != '我的')
            this.props.replaceCurrent('我的', PersonalPage, {...this.props});
    }

    /*changeToAsk() {
        if (this.props.routeName != '问答')
            this.props.replaceCurrent('问答', AnswerPage, {...this.props});
    }*/

    render() {
        return (
            <View style={{height:49}}>
                <View style={styles.contentStyle}>
                    <TouchableOpacity style={styles.colButton} activeOpacity={1}
                                      onPress={this.changeToHomePage.bind(this)}>
                        {
                            this.props.routeName == '首页' ?
                                <Image resizeMode={'cover'} style={styles.img}
                                       source={require('../../images/common/home.png')}/>
                                :
                                <Image resizeMode={'cover'} style={styles.img}
                                       source={require('../../images/common/homeAsh.png')}/>
                        }
                        {/*<Text style={[styles.aroundText,{color:this.props.routeName != '首页'?'#666666':'#313131'}]}>首页</Text>*/}
                    </TouchableOpacity>
                    {/*<TouchableOpacity style={styles.colButton} activeOpacity={1}
                                      onPress={this.changeToAsk.bind(this)}>
                        {
                            this.props.routeName == '问答' ?
                                <Image resizeMode={'cover'} style={styles.img}
                                       source={require('../../images/common/ask.png')}/>
                                :
                                <Image resizeMode={'cover'} style={styles.img}
                                       source={require('../../images/common/askAsh.png')}/>
                        }
                        /!*<Text style={[styles.aroundText,{color:this.props.routeName != '我的'?'#666666':'#313131'}]}>我的</Text>*!/
                    </TouchableOpacity>*/}
                    <TouchableOpacity style={styles.colButton} activeOpacity={1}
                                      onPress={this.changeToInfo.bind(this)}>
                        {
                            this.props.routeName == '我的' ?
                                <Image resizeMode={'cover'} style={styles.img}
                                       source={require('../../images/common/my.png')}/>
                                :
                                <Image resizeMode={'cover'} style={styles.img}
                                       source={require('../../images/common/myAsh.png')}/>
                        }
                        {/*<Text style={[styles.aroundText,{color:this.props.routeName != '我的'?'#666666':'#313131'}]}>我的</Text>*/}
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    contentStyle: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: Dimensions.get("window").width,
        height: 49,
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderTopColor: '#dddddd',
        // borderTopWidth: Config.borderWidth
    },
    colButton: {
        flex: 1,
        height: 49,
        justifyContent: 'center',
        paddingVertical: 3,
        alignItems: 'center'
    },
    aroundText: {
        fontSize: 10,
        color: '#666666',
        marginTop: 5
    },
    img: {
        width: 24,
        height: 24
    }
});