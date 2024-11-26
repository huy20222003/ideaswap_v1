import { Suspense, lazy } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from '../layouts/dashboardLayout';
import AuthLayout from '../layouts/authLayout';
import VideoLayout from '../layouts/VideoLayout';
import CreatorLayout from '../layouts/creatorLayout';
import SettingLayout from '../layouts/settingLayout';
import AccountLayout from '../layouts/accountLayout';
import ChatLayout from '../layouts/chatLayout';
//loader
import Loader from '../Components/Loader';
//private router
import PrivateRouter from './PrivateRouter';
//page 404
import Page404 from '../Pages/Page404';
//page
const DashboardAppPage = lazy(() => import('../Pages/DashboardAppPage'));
const DocumentPage = lazy(() => import('../Pages/DocumentPage'));
const CoursePage = lazy(() => import('../Pages/CoursePage'));
const DonatePage = lazy(() => import('../Pages/DonatePage'));
const VideoPage = lazy(() => import('../Pages/VideoPage'));
const ProfilePage = lazy(() => import('../Pages/ProfilePage'));
const PasswordPage = lazy(() => import('../Pages/PasswordPage'));
const LanguagePage = lazy(() => import('../Pages/LanguagePage'));
const AccountPage = lazy(() => import('../Pages/AccountPage'));
const BlogDetailPage = lazy(() => import('../Pages/BlogDetailPage'));
const DocumentDetailPage = lazy(() => import('../Pages/DocumentDetailPage'));
const ForgetPasswordPage = lazy(() => import('../Pages/ForgetPasswordPage'));
const VerifyCodePage = lazy(() => import('../Pages/VerifyCodePage'));
const ResetPasswordPage = lazy(() => import('../Pages/ResetPasswordPage'));
const ChatPage = lazy(() => import('../Pages/ChatPage'));
//auth page
const LoginPage = lazy(() => import('../Pages/AuthPage/LoginPage'));
const RegiterPage = lazy(() => import('../Pages/AuthPage/RegisterPage'));
//creator page
const DashboardPage = lazy(() => import('../Pages/Creator/dashboard'));
const ContentPage = lazy(() => import('../Pages/Creator/content'));
// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/',
      element: <Navigate to="/dashboard/app" />,
    },
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'blog/:_id', element: <BlogDetailPage /> },
        { path: 'document', element: <DocumentPage /> },
        { path: 'document/:_id', element: <DocumentDetailPage /> },
        { path: 'course', element: <CoursePage /> },
        { path: 'donate', element: <DonatePage /> },
      ],
    },
    {
      path: '/auth',
      element: <AuthLayout />,
      children: [
        { path: 'login', element: <LoginPage /> },
        { path: 'register', element: <RegiterPage /> },
      ],
    },
    { path: '/forget-password', element: <ForgetPasswordPage /> },
    { path: '/verify-code', element: <VerifyCodePage /> },
    { path: '/reset-password', element: <ResetPasswordPage /> },
    {
      path: '/course',
      element: <VideoLayout />,
      children: [{ path: ':courseId', element: <VideoPage /> }],
    },
    {
      path: '/creator',
      element: <CreatorLayout />,
      children: [
        {
          path: 'dashboard',
          element: (
            <PrivateRouter
              element={<DashboardPage />}
              redirectTo="/auth/login"
            />
          ),
        },
        {
          path: 'content',
          element: (
            <PrivateRouter element={<ContentPage />} redirectTo="/auth/login" />
          ),
        },
      ],
    },
    {
      path: '/chat',
      element: <ChatLayout />,
      children: [
        {
          path: ':_id',
          element: (
            <PrivateRouter
              element={<ChatPage />}
              redirectTo="/auth/login"
            />
          ),
        },
      ],
    },
    {
      path: '/setting',
      element: <SettingLayout />,
      children: [
        {
          path: 'profile',
          element: (
            <PrivateRouter element={<ProfilePage />} redirectTo="/auth/login" />
          ),
        },
        {
          path: 'password',
          element: (
            <PrivateRouter
              element={<PasswordPage />}
              redirectTo="/auth/login"
            />
          ),
        },
        {
          path: 'language',
          element: (
            <PrivateRouter
              element={<LanguagePage />}
              redirectTo="/auth/login"
            />
          ),
        },
      ],
    },
    {
      path: '/account',
      element: <AccountLayout />,
      children: [
        {
          path: ':_id',
          element: (
            <PrivateRouter element={<AccountPage />} redirectTo="/auth/login" />
          ),
        },
      ],
    },
    {
      path: '*',
      element: <Page404 />,
    },
  ]);

  return <Suspense fallback={<Loader />}>{routes}</Suspense>;
}
