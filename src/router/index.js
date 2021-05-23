import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: '*',
    redirect: "login"
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/Register.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/forgot-password",
    name: "ForgotPassword",
    component: () => import("../views/ForgotPassword.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/new-password",
    name: "NewPassword",
    component: () => import("../views/NewPassword.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/verify-code",
    name: "VerifyCode",
    component: () => import("../views/VerifyCode.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/",
    name: "HomePage",
    component: () => import("../views/HomePage.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/create-label",
    name: "CreateLabelPage",
    component: () => import("../views/CreateLabel.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/about",
    name: "AboutUs",
    component: () => import("../views/AboutUs.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/contact",
    name: "Contact",
    component: () => import("../views/Contact.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/tracking",
    name: "Tracking",
    component: () => import("../views/Tracking.vue"),
    meta: { requiresAuth: false },
  },

  {
    path: "/customer",
    name: "Customer",
    component: () => import("../views/Customer.vue"),
    meta: { requiresAuth: true, role: "Customer", url: "/customer" },
    children: [
      { path: "", redirect: "overview" },
      {
        path: "overview",
        name: "Overview",
        meta: {
          breadcrumbs: ["System Overview"],
        },
        component: () => import("../views/share/Overview.vue"),
      },
      {
        path: "orders",
        name: "OrdersList",
        meta: {
          breadcrumbs: ["Your Orders"],
        },
        component: () => import("../views/share/OrdersList.vue"),
      },
      {
        path: "order-detail/:id",
        name: "OrderDetail",
        meta: {
          breadcrumbs: ["Your Orders"],
        },
        component: () => import("../views/share/OrderDetail.vue"),
      },
      {
        path: "create-label",
        name: "CreateLabel",
        meta: {
          breadcrumbs: ["Create Label"],
        },
        component: () => import("../views/share/CreateLabel.vue"),
      },
      // {
      //   path: "setting",
      //   name: "Setting",
      //   meta: {
      //     breadcrumbs: ["Settings"],
      //   },
      //   component: () => import("../views/share/Setting.vue"),
      // },
      {
        path: "profile",
        name: "Profile",
        meta: {
          breadcrumbs: ["Profiles"],
        },
        component: () => import("../views/share/Profile.vue"),
      },
      {
        path: "profile/change-password",
        name: "PasswordComponent",
        meta: {
          breadcrumbs: ["Profiles","Change Password"],
        },
        component: () => import("../components/customer/PasswordComponent.vue"),
      },
    ],
  },

  // Admin

  {
    path: "/admin",
    name: "Admin",
    component: () => import("../views/Admin.vue"),
    meta: { requiresAuth: true, role: "Admin", url: "/admin" },
    children: [
      { path: "", redirect: "overview" },
      {
        path: "overview",
        name: "Overview",
        meta: {
          breadcrumbs: ["System Overview"],
        },
        component: () => import("../views/share/Overview.vue"),
      },
      {
        path: "users",
        name: "Users",
        meta: {
          breadcrumbs: ["Users"],
        },
        component: () => import("../views/admin/Users.vue"),
      },
      {
        path: "customers",
        name: "Customers",
        meta: {
          breadcrumbs: ["Customers"],
        },
        component: () => import("../views/admin/Customers.vue"),
      },
      {
        path: "/users/detail/:id",
        name: "UserDetail",
        meta: {
          breadcrumbs: ["Users", "UserDetails"],
        },
        component: () => import("../views/admin/UserDetail.vue"),
      },
      {
        path: "/users/detail/acount",
        name: "AcountDetail",
        meta: {
          breadcrumbs: ["Users", "UserDetails", "Account"],
        },
        component: () => import("../views/customer/AcountDetail.vue"),
      },
      {
        path: "create-label",
        name: "CreateLabel",
        meta: {
          breadcrumbs: ["Create Label"],
        },
        component: () => import("../views/share/CreateLabel.vue"),
      },
      {
        path: "orders",
        name: "OrdersList",
        meta: {
          breadcrumbs: ["Orders List"],
        },
        component: () => import("../views/share/OrdersList.vue"),
      },
      {
        path: "order-detail/:id",
        name: "OrderDetail",
        meta: {
          breadcrumbs: ["Orders List"],
        },
        component: () => import("../views/share/OrderDetail.vue"),
      },
      {
        path: "order-detail/:id/edit-order",
        name: "EditOrderDetail",
        meta: {
          breadcrumbs: ["Edit Orders Detail"],
        },
        component: () => import("../views/admin/EditOrderDetail.vue"),
      },
      {
        path: "specialItems",
        name: "SpecialItems",
        meta: {
          breadcrumbs: ["Special Items"],
        },
        component: () => import("../views/admin/SpecialItems.vue"),
      },
      {
        path: "setting",
        name: "Setting",
        meta: {
          breadcrumbs: ["Settings"],
        },
        component: () => import("../views/admin/Setting.vue"),
      },
      {
        path: "profile",
        name: "Profile",
        meta: {
          breadcrumbs: ["Profiles"],
        },
        component: () => import("../views/share/Profile.vue"),
      },
      {
        path: "payments",
        name: "Payments",
        meta: {
          breadcrumbs: ["Payments"],
        },
        component: () => import("../views/admin/Payment.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
