import React, {Component} from 'react';
import {Button, Checkbox, Icon, Input, Form} from "antd";
import {Link} from "react-router-dom";
import {userServices, config} from '../lib';
import $ from 'jquery'
import axios from 'axios'

const FormItem = Form.Item;

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            password: null,
            loading: false
        };
    }

    sing_in = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // this.setState({loading: true});
                // userServices.sign_in({
                //     username: values.username,
                //     password: values.password
                // }).then(() => {
                //     this.setState({loading: false});
                //     this.props.history.replace('/');
                // }).catch((err) => {
                //     this.setState({loading: false});
                //     if (err.response)
                //         config.error(err.response.data.error_description);
                // });
                $.ajax({
                    type: "POST",
                    url: "http://localhost:12345/get/token",
                    data: {
                        email: values.username,
                        password: values.password,
                        grant_type: 'password'
                    },
                    dataType: "json",
                    success: function (data) {
                        console.log(data)
                        // var my = JSON.stringify(data);
                        // $.cookie('token', my, {path: '/'});
                        // axios.defaults.headers.common['Authorization'] = "Bearer " + data.access_token;
                        // window.location.href = 'http://localhost:8080/#/AdminHome/Welcome';
                    },
                    error: function (msg) {
                        alert("账号或者密码错误");
                    }
                });
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div style={{marginTop: '200px'}}>
                <div style={{width: '300px', margin: '0 auto', textAlign: 'center'}}>
                   
                </div>
                <Form onSubmit={this.sing_in} className="login-form"
                      style={{width: '300px', margin: '0 auto', marginTop: '50px'}}>
                    <FormItem>
                        {getFieldDecorator('username', {
                            rules: [{required: true, message: '请输入您的账号!'}],
                        })(
                            <Input prefix={<Icon type="user" style={{fontSize: 13}}/>} placeholder="账号"/>
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{required: true, message: '请输入您的密码!'}],
                        })(
                            <Input prefix={<Icon type="lock" style={{fontSize: 13}}/>} type="password"
                                   placeholder="密码"/>
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(
                            <Checkbox>记住我</Checkbox>
                        )}
                        <a className="login-form-forgot" href="" style={{float: 'right'}}>忘记密码？</a>
                        <Button type="primary" htmlType="submit" loading={this.state.loading}
                                className="login-form-button" style={{width: '100%'}}>
                            登录
                        </Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

const WrappedNormalLoginForm = Form.create()(Login);

export default WrappedNormalLoginForm;
