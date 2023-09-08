import request from "../../config/http"

//list
export function listsApi(params?: object) {
    return request({
        url: '/admin/branch/Street_Manage/getStreetList',
        method: 'post',
        params
    })
}
//add
export function addApi(params?: object) {
    return request({
        url: '/admin/branch/Street_Manage/addStreet',
        method: 'post',
        params
    })
}
//edit
export function editApi(params?: object) {
    return request({
        url: '/admin/branch/Street_Manage/editStreet',
        method: 'post',
        params
    })
}
