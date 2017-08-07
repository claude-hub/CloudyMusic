import {message} from 'antd';
import moment from 'moment';

const error = (value) => {
    message.error(value, 2)
};

const success = (value) => {
    message.success(value, 2)
};
let params = {
    error: error,
    success: success,
    dateFormat: {
        getDate: (str) => {
            return moment(str).format("YYYY-MM-DD");
        },
        getTime: (str) => {
            return moment(str).format("HH:mm");
        },
        getDateTime: (str) => {
            return moment(str).format("YYYY-MM-DD HH:mm");
        },
        getDateMonth: (str) => {
            return moment(str).format("MM-DD HH:mm");
        },
        getMonthDay: (str) => {
            return moment(str).format("MM-DD");
        }
    }
};
const config = {
    development: {
        service: {
            url: 'localhost:12345'
        },
        socket: {
            globalCableUrl: 'ws://s.cn-su.net:8001/cable'
        }
    },
};
export default Object.assign({}, config, config.development, params);