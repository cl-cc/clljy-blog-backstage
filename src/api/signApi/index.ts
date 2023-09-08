import request from '../../config/http';

//列表
export function List(params?: object) {
  return request({
    url: '/api/admin/juejins',
    method: 'get',
    params,
  });
}
//删除
export function Del(params?: number) {
  return request({
    url: `/api/admin/juejins/${params}`,
    method: 'delete',
  });
}
//通讯
export function Set(params?: object) {
  return request({
    url: '/api/admin/juejinSign',
    method: 'get',
    params,
  });
}
//添加
export function Add(params?: object) {
  return request({
    url: `/api/admin/juejins`,
    method: 'post',
    params,
  });
}
//修改
export function Edit(id?: number, params?: object) {
  return request({
    url: `/api/admin/juejins/${id}`,
    method: 'patch',
    params,
  });
}
//查看日志
export function Log(params?: object) {
  return request({
    url: `/api/admin/juejinsLog`,
    method: 'get',
    params,
  });
}
