import config from './config'
import axios from 'axios'

export default class Service {
    static get token() {
        return global.Store.getState().Session.Token;
    }

    // 基服务
    static get commonService() {
        let service = axios.create({
            baseURL: `${config.service.url}/api/Admin`,
            headers: {Token: Service.token, 'App-Version': '0.1.0'}
        });

        service.defaults.timeout = 12000;
        return service;
    }

    // 获取活动信息
    static admin() {
        return Service.commonService.get(``);
    }

    // 获取管理员列表
    static admin_login(data = {}) {
        return Service.commonService.get(`/Login?name=${data.name}&password=${data.password}`)
    }
}