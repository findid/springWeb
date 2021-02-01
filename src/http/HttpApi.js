import HttpUtil from './httpUtil'

export default {

  //查询用户
  getUsers: (param) => {
    return HttpUtil.httpGet('getUsers', param);
  },
  //新增用户
  add: (param) => {
    return HttpUtil.httpPost('add', param);
  },
  //删除用户
  delete: (id) => {
    return HttpUtil.httpGet('delete/'+id);
  }


}

















