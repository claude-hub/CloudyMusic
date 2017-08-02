import config from './config'
import axios from 'axios'

export default class Service{
    // 基服务
    static get commonService() {
        let service = axios.create({
            baseURL: `${config.service.url}/api/platform/common`,
            headers: {Token: Service.token, 'App-Version': '0.1.0'}
        });

        service.defaults.timeout = 12000;
        return service;
    }

    static student(){
        return Service.commonService().get(``);
    }

    static student_manage(data = {}){
        return Service.commonService.get(`/student?organization_id=${data.organization_id}&gender=${data.gender}&grade_id=${data.grade_id}&district_id=${data.district_id}&query=${data.query}`);
    }

    static bed_room_manage(data = {}){
        return Service.commonService.get(`/bed_room?organization_id=${data.organization_id}&gender_room=${data.gender_room}&grade_id=${data.grade_id}&district_id=${data.district_id}&building_id=${data.building_id}&query=${data.query}`);
    }

    static clazz_manage(data = {}){
        return Service.commonService.get(`/clazz?organization_id=${data.organization_id}&grade_id=${data.grade_id}&query=${data.query}`);
    }

    static teacher_manage(data = {}){
        return Service.commonService.get(`/teacher?organization_id=${data.organization_id}&gender=${data.gender}&query=${data.query}`);
    }
}