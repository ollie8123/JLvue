import { createStore } from "vuex";
import { CookieAxios } from "../service/api";
import {successMsg ,errorMsg} from "../service/sweetalert2";

export default createStore({
  state: {
    Cart: [],
    checkoutList: [],
  },
  getters: {
    Cart: (state) => {
      return state.Cart;
    },
    checkoutList: (state) => {
      return state.checkoutList;
    },
  },
  mutations: {
    setCartData(state, data) {
      state.Cart = data;
    },
    setCheckoutList(state, data) {
      state.checkoutList = data;
    },
  },
  actions: {
    // getShoppingCart({ dispatch,commit }) {
    //   CookieAxios.post("/selectUserShoppingCart").then((res) => {
    //       commit("setCartData", res.data.data);
    //       dispatch('consoleTest')
    //   });
    //   },
    async getCheckoutList({ commit }, { checkoutList }) {
        commit("setCheckoutList", checkoutList);
    },
    async getShoppingCart({ dispatch, commit }) {
      await CookieAxios.post("/selectUserShoppingCart").then((res) => {
        commit("setCartData", res.data.data);
      });
    },
    async changeShoppingCartProductCount({ dispatch }, { id, count }) {
      id = Number(id);
      count = Number(count);
      const res = await CookieAxios.put("/changeShoppingCartProductCount", {
        id,
        count,
      });
      if (res.data.code == 0) {
        errorMsg(res.data.msg);
        dispatch("getShoppingCart");
      }
    },
    async deleteShoppingCart({ dispatch }, { ids }) {
      const res = await CookieAxios.delete("/deleteShoppingCartProduct", {
        data: { ids: ids },
      });
      dispatch("getShoppingCart");
    },
  },
  modules: {},
});
