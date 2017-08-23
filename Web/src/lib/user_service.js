import config from './config';
import Store from "./store";
import axios from 'axios';

export default class Service {
    static get token() {
        return global.Store.getState().Session.Token;
    }

    // 基服务
    static get commonService() {
        let service = axios.create({
            baseURL: `${config.service.url}/api/user`,
            headers: {Token: Service.token,'App-Version': '0.1.0'}
        });

        service.defaults.timeout = 12000;
        return service;
    }

    // 基服务
    static get sessionService() {
        let service = axios.create({
            baseURL: `${config.service.url}/api`,
        });

        service.defaults.timeout = 12000;
        return service;
    }
    static sign_in(data) {
        return new Promise(function (resolve, reject) {
            Service.sessionService.post(`/get/token?email=${data.username}&password=${data.password}`, {}).then((ret) => {
                console.log(ret);
                Store.dispatch({
                    type: 'SESSION:UP',
                    token: ret.data.token,
                    user: {
                        id: ret.data.id,
                        name: ret.data.name
                    }
                });
                resolve(ret)
            }).catch(reject)
        });
    }
}