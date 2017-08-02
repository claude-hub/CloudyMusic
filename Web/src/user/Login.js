import React, {Component} from 'react';
import {Button, Checkbox, Icon, Input, Form} from "antd";
import {Link} from "react-router-dom";
import {services,config} from '../lib';
// import './App.css';

const FormItem = Form.Item;

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            password: null
        };
    }

    sing_in = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                services.sign_in({
                    username: values.username,
                    password: values.password
                }).then(() => {
                    this.props.history.replace('/');
                }).catch((err) => {
                    if(err.response)
                        config.error(err.response.data.error_description);
                });
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form onSubmit={this.sing_in} className="login-form">
                <FormItem>
                    {getFieldDecorator('username', {
                        rules: [{required: true, message: 'Please input your username!'}],
                    })(
                        <Input prefix={<Icon type="user" style={{fontSize: 13}}/>} placeholder="账号"/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{required: true, message: 'Please input your Password!'}],
                    })(
                        <Input prefix={<Icon type="lock" style={{fontSize: 13}}/>} type="password" placeholder="密码"/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox>记住我</Checkbox>
                    )}
                    <a className="login-form-forgot" href="">忘记密码？</a>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        登录
                    </Button>
                </FormItem>
            </Form>
        );
    }
}

const WrappedNormalLoginForm = Form.create()(Login);

export default WrappedNormalLoginForm;
