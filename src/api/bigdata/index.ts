import request from "../../config/http"

//登录
export function dataListApi(params?: any) {
    return request({
        url: '/api/keqiao/Cultivation/dataList',
        method: 'post',
        params
    })
}
