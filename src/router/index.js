import { createRouter, createWebHistory } from 'vue-router';
import { CookieAxios } from '../service/api';
const router = createRouter({
	// history: createWebHistory(import.meta.env.BASE_URL),
	history: createWebHistory('Jingling/'),
	//history: createWebHashHistory(),
	routes: [
		{
			path: '/',
			name: 'index',
			component: () => import('../views/index/IndexView.vue'),
			children: [
				{
					path: 'HomePageView',
					name: 'HomePageView',
					component: () => import('../views/index/HomePageView.vue'),
				},
				{
					path: 'search_keyword',
					name: 'search_keyword',
					component: () => import('../views/index/search/search_keyword.vue'),
				},

				{
					path: 'search_category',
					name: 'search_category',
					component: () => import('../views/index/search/search_category.vue'),
				},
				{
					path: 'search_sellers',
					name: 'search_sellers',
					component: () => import('../views/index/search/search_sellers.vue'),
				},
				{
					path: 'seller_page',
					name: 'seller_page',
					component: () => import('../views/index/search/seller_page.vue'),
				},

        {
          path: "search_category",
          name: "search_category",
          component: () => import("../views/index/search/search_category.vue"),
        },
        {
          path: "search_sellers",
          name: "search_sellers",
          component: () => import("../views/index/search/search_sellers.vue"),
        },
        {
          path: "seller_page",
          name: "seller_page",
          component: () => import("../views/index/search/seller_page.vue"),
        },

        {
          path: "product_page",
          name: "product_page",
          component: () => import("../views/index/search/product_page.vue"),
        },
      ],
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/noPath/login/login.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/noPath/register/register.vue"),
    },
    {
      path: "/cart",
      name: "cart",
      component: () => import("../views/noPath/shoppingCart/shoppingCart.vue"),
    },
    {
      path: "/checkout",
      name: "checkout",
      component: () => import("../views/noPath/ckeckout/checkout.vue"),
    },
    {
      path: "/sellerRegister",
      name: "sellerRegister",
      component: () => import("../views/noPath/register/SellerRegister.vue"),
     
    },
    {
      path: "/sellerInfo",
      name: "sellerInfo",
      component: () => import("../views/noPath/register/SellerInfo.vue"),
    },

  
    //User頁面
    {
      path: "/user",
      name: "user",
      component: () => import("../views/user/user.vue"),
      children: [
        {
          path: "account",
          name: "account",
          component: () => import("../views/user/account/account.vue"),
          children: [
            {
              path: "address",
              name: "address",
              component: () =>
                import("../views/user/account/address/address.vue"),
            },
            {
              path: "payment",
              name: "payment",
              component: () =>
                import("../views/user/account/payment/payment.vue"),
                children: [
                  {
                    path: "CreateCreditcard",
                    name: "CreateCreditcard",
                    component: () =>
                      import("../views/user/account/payment/CreateCreditcard.vue"),
                  }
                ]
            },
            {
              path: "profile",
              name: "profile",
              component: () =>
                import("../views/user/account/profile/profile.vue"),
            },
            
          ],
        },
        {
          path: "purchase",
          name: "purchase",
          component: () => import("../views/user/purchase/purchase.vue"),
        },
        {
          path: "notifications",
          name: "notifications",
          component: () =>
            import("../views/user/notifications/notifications.vue"),
        },
        {
          path: "coupon",
          name: "coupon",
          component: () => import("../views/user/coupon/coupon.vue"),
        },
      ],
    },
    //seller頁面
    {
      path: "/seller",
      name: "seller",
      component: () => import("../views/seller/seller.vue"),
      children: [
        {
          path: "order",
          name: "order",
          component: () => import("../views/seller/order/order.vue"),
        },
        {
          path: "management",
          name: "management",
          component: () => import("../views/seller/management/management.vue"),
        },
        {
          path: "product",
          name: "product",
          component: () => import("../views/seller/product/product.vue"),
        },
       

      ],
    },
    //NotFoundt處理放在最後面
    {
      path: "/:domain",
      name: "NotFound",
      component: import("../views/error/404.vue"),
    },
  ],
});
router.beforeEach(async (to, from, next) => {
  sessionStorage.setItem("redirectTo", window.location.href);

  function isAuthPath(path) {
    //設定需驗證的路徑
    const authPaths = ["/user", "/seller", "/cart", "/checkout"];
    //authPaths.map會對authPaths陣列中的每個元素執行一個函數，並回傳一個新陣列
    const regexPatterns = authPaths.map((authPath) => {
      return new RegExp(`^${authPath}(/|$)`);
    });
    //regexPatterns.some會檢查regexPatterns中至少一個元素是否滿足給定的條件，條件為pattern.test(表示檢查是否path匹配pattern)
    return regexPatterns.some((pattern) => pattern.test(path));
  }
  //調用驗證方法，to.path參數為要前往的路徑，驗證是否是我們要驗證的主路徑或其子路徑(是回傳true否則回傳false)
  const authRequired = isAuthPath(to.path);

  await CookieAxios.post("/login/tokenChecking").then((rep) => {
    console.log(rep.data.msg);
    if (rep.data.code == 1) {
      localStorage.setItem("loggedIn", true);
      if (to.path === "/login" || to.path === "/register") {
        next("/");
      } else if (to.path === "/") {
        next("/HomePageView");
      } else {
        next();
      }
    } else {
      localStorage.setItem("loggedIn", false);
      if (authRequired) {
        next("/login");
      } else if (to.path === "/") {
        next("/HomePageView");
      } else {
        next();
      }
    }
  });
});
export default router;
