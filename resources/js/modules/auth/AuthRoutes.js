import AuthLayout from '@/layouts/views/AuthLayout.vue';
import Page from '@/modules/auth/views/Page.vue';
import Login from '@/modules/auth/components/Login.vue';
import RegLanding from '@/modules/auth/views/RegLanding.vue';
import Signup from '@/modules/auth/components/Signup.vue';

export default [
  {
    path: '/',
    component: AuthLayout,
    children: [
      {
        path: '',
        redirect: '/auth/login',
      },

      // AUTH SECTION (uses Page layout)
      {
        path: 'auth',
        component: Page,
        children: [
          {
            path: '',
            redirect: 'login',
          },
          {
            path: 'login/:token?',
            name: 'Login',
            component: Login,
          },
          {
            path: 'landing',
            name: 'RegLanding',
            component: RegLanding,
          },
          {
            path: 'signup/:category',
            name: 'Signup',
            component: Signup,
          },
          // {
          //   path: 'activate',
          //   name: 'Activation Page',
          //   component: Activate,
          // },
          // {
          //   path: 'forgot-password',
          //   name: 'Forgot password',
          //   component: ForgotPassword,
          // },
          // {
          //   path: 'password/:token',
          //   name: 'Set Password',
          //   component: ResetPassword,
          // },
        ],
      },

      // OTHER PAGES (outside auth split layout)
      // {
      //   path: 'landing',
      //   name: 'Landing Page',
      //   component: Landing,
      // },
      // {
      //   path: 'init-profile',
      //   name: 'Initialize profile',
      //   component: Profile,
      // },
    ],
  },
]
