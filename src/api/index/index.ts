import request from '../../config/http';

//登录
export function loginApi(params?: object) {
  return request({
    url: '/api/admin/authorizations',
    method: 'post',
    params,
  });
}
``;
