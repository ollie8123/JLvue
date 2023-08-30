import { createStore } from "vuex";
import { CookieAxios } from "../service/api";
import {successMsg ,errorMsg} from "../service/sweetalert2";

export default createStore({
  state: {
    Cart: [],
    checkoutProductList: [],
    checkoutCouponList: [],
  },
  getters: {
    Cart: (state) => {
      return state.Cart;
    },
    checkoutProductList: (state) => {
      return state.checkoutProductList;
    },
    checkoutCouponList: (state) => {
      return state.checkoutCouponList;
    },
  },
  mutations: {
    setCartData(state, data) {
      state.Cart = data;
    },
    setCheckoutProductList(state, data) {
      state.checkoutProductList = data;
    },
    setCheckoutCouponList(state, data) {
      state.checkoutCouponList = data;
    },
  },
  actions: {
    // getShoppingCart({ dispatch,commit }) {
    //   CookieAxios.post("/selectUserShoppingCart").then((res) => {
    //       commit("setCartData", res.data.data);
    //       dispatch('consoleTest')
    //   });
    //   },
    getCheckoutCouponList({ commit }, { checkoutCouponList }) {
      commit("setCheckoutCouponList", checkoutCouponList);
    },
    getCheckoutProductList({ commit }, { checkoutProductList }) {
      commit("setCheckoutProductList", checkoutProductList);
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
