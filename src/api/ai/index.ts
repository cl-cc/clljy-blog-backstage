import request from '../../config/http';

export function ai(params?: any) {
  return request({
    url: 'https://api.openai.com/v1/completions',
    method: 'post',
    params
  });
}
