import React from "react";
import {Redirect, Route} from "react-router-dom";
import {connect} from "react-redux";
import {services, config} from '../lib';

class AuthRoute extends React.Component {
    componentWillMount() {
        this.getCollege();
    }

    // 获取学院数据
    getCollege() {
        services.college({university_id: 1}).then((ret) => {
            if (ret.data && ret.data.length > 0) {
                this.getSchoolTime(ret.data[0].id);
                this.getDistrict(ret.data[0].id);
                this.getGrade(ret.data[0].id);
                const data = this.dealCollege(ret.data, 0);
                this.props.setCollege(data);
            }
        }).catch((err) => {
        })
    }

    // 将学院数据处理为需要的格式
    dealCollege(data, index) {
        let result = [];
        for (let i = 0; i < data.length; i++) {
            const temp = {
                label: data[i].name,
                value: index == 0 ? 'all' : data[i].id,
                key: data[i].id
            };
            if (data[i].children) {
                temp.children = this.dealCollege(data[i].children, ++index);
            }
            result.push(temp);
        }
        return result;
    }

    // 获取时间数据
    getSchoolTime(university_id) {
        services.school_term({university_id}).then((ret) => {
            if (ret) {
                this.dealSchoolTime(ret.data);
            }
        }).catch((err) => {
            console.log(err.response);
        })
    }

    // 获取学年学期
    dealSchoolTime(data) {
        let schoolYear = [];
        for (let i = 0; i < data.length; i++) {
            const temp = {
                value: data[i].name,
                key: data[i].id
            };

            schoolYear.push(temp);
        }
        this.props.setSchoolTime({schoolTimeData: data, schoolYear, semester: null});
    }

    // 获取校区数据
    getDistrict(university_id) {
        services.district({university_id}).then((ret) => {
            if (ret) {
                this.dealDistrict(ret.data);
            }
        }).catch((err) => {
            console.log(err.response);
        })
    }

    // 获取校区建筑
    dealDistrict(data) {
        let district = [];
        let building = [];
        for (let i = 0; i < data.length; i++) {
            const temp = {
                value: data[i].name,
                key: data[i].id
            };
            for (let j = 0; j < data[i].buildings.length; j++) {
                const building_temp = {
                    value: data[i].buildings[j].name,
                    key: data[i].buildings[j].id
                };
                building.push(building_temp);
            }
            district.push(temp);
        }
        this.props.setDistrict({districtData: data, district, building});
    }

    // 获取年级
    getGrade(university_id) {
        let grades = [];
        services.grade({university_id}).then((ret) => {
            if (ret) {
                const data = ret.data;
                for (let i = 0; i < data.length; i++) {
                    const temp = {
                        value: data[i].name,
                        key: data[i].id
                    };
                    grades.push(temp);
                }
                this.props.setGrade(grades);
            }
        }).catch((err) => {
            console.log(err.response);
        })
    }

    get isAuthenticated() {
        return this.props.token;
    }

    get routeProps() {
        let _props = Object.assign({}, this.props);
        delete _props.component;
        return _props
    }

    onRender(props) {
        return this.isAuthenticated ?
            React.createElement(this.props.component, props)
            :
            <Redirect to={ {pathname: '/login', state: {from: props.location}} }/>
    }

    render() {
        return (
            <Route {...this.routeProps} render={ this.onRender.bind(this) }/>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.Session.Token,
    }
};
//  方法返回action， 组件内用 this.props.xxx调用
const mapDispatchToProps = {
    setCollege: (params) => {
        return {
            type: 'COLLEGE:SET',
            collegeData: params
        }
    },
    setSchoolTime: (params) => {
        return {
            type: 'SCHOOL:SET',
            schoolTimeData: params.schoolTimeData,
            schoolYear: params.schoolYear,
            semester: params.semester
        }
    },
    setDistrict: (params) => {
        return {
            type: 'DISTRICTDATAALL:SET',
            districtData: params.districtData,
            district: params.district,
            building: params.building
        }
    },
    setGrade: (params) => {
        return {
            type: 'GRADE:SET',
            grade: params
        }
    }
};

AuthRoute = connect(mapStateToProps, mapDispatchToProps)(AuthRoute);

export default AuthRoute