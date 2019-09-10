import Cookies from 'js-cookie';
const user = {
  state: {
    admins: ['one', 'two', 'three', 'four'],
    crud: ['one', 'two', 'three', 'four'],
    curUser: {
      username: 'giao',
      name: 'giao'
    }
  },
  mutations: {
    SET_USER(state, value) {
      state.curUser = value;
      Cookies.set('curUser', JSON.stringify(value))
    }

  }
}
export default user
