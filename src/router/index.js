import { createRouter, createWebHistory } from 'vue-router'
import {
  clearLoggedUser,
} from "../states/loggedUser.js";
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/SignupView.vue')
    },
    {
      path: '/logout',
      name: 'logout',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: clearLoggedUser
    },
    {
      path: '/api/robot',
      name: 'testrobotapi',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/TestRobotAPIView.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ProfileView.vue')
    },
    {
      path: '/robots/create',
      name: 'create-robot',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/CreateRobotView.vue')
    },
    {
      path: '/organisations',
      name: 'organisations',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/OrganisationView.vue')
    },
    {
      path: '/organisations/create',
      name: 'create-organisation',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/CreateOrganisationView.vue')
    },
    {
      path: '/organisations/:org_name/info',
      name: 'organisation-info',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/OrganisationInfoView.vue'),
    },
    {
      path: '/organisations/:org_name/robots',
      name: 'robots',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/RobotView.vue')
    },
    {
      path: '/organisations/:org_name/addrobot',
      name: 'add-robot',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AddRobotView.vue')
    },
    {
      path: '/organisations/:org_name/robots/:id',
      name: 'robot-info',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/RobotInfoView.vue')
    },
    {
      path: '/organisations/:org_name/plans',
      name: 'plans',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/PlanView.vue')
    },
    {
      path: '/organisations/:org_name/plans/create',
      name: 'create-plan',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/CreatePlanView.vue')
    },
    {
      path: '/organisations/:org_name/plans/:id',
      name: 'plan-info',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/PlanInfoView.vue')
    },
    {
      path: '/organisations/:org_name/plans/:id/toclassify',
      name: 'trash-toclassify',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/TrashView.vue')
    },
    {
      path: '/organisations/:org_name/plans/:plan_id/toclassify/:trash_id',
      name: 'trash-info',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/TrashInfoView.vue')
    }
  ]
})

export default router

