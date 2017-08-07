import React, {Component} from 'react';
import {Button, Checkbox, Icon, Input, Form} from "antd";
import axios from "axios";

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
            test: "",
        };
    }
    componentWillMount() {
        var _this = this;
        axios
            .get("http://localhost:7000/api/User/Test")
            .then(function (response) {
                _this.setState({ test: response.data });
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form  className="login-form">
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
