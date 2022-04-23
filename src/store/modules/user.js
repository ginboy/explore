const state = {
  userInfo: {}
};

const mutations = {
  setUserInfo(state, infoObj) {
    state.userInfo = infoObj;
  }
};
const actions = {
  async getUserInfo({ commit }) {
    //异步接口请求
    setTimeout(() => {
      let obj = {
        userName: "你的姓名敲可爱！",
        age: 18
      };
      commit("setUserInfo", obj);
    }, 0);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
