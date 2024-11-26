import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
//en
import {
  NAVBAR_EN,
  BLOGS_EN,
  ACCOUNT_EN,
  SETTING_EN,
  VIDEOS_EN,
  DASHBOARD_CREATOR_EN,
  DOCUMENTS_EN,
  DONATE_EN,
  COURSES_EN,
  CONTENT_CREATOR_EN,
  AUTH_EN,
  NOTIFICATION_EN,
  FOOTER_EN,
  PAGE404_EN,
  CHAT_EN
} from '../locales/en';

const resources = {
  en: {
    navbar: NAVBAR_EN,
    blogs: BLOGS_EN,
    account: ACCOUNT_EN,
    setting: SETTING_EN,
    videos: VIDEOS_EN,
    dashboardCreator: DASHBOARD_CREATOR_EN, // Fixed typo
    contentCreator: CONTENT_CREATOR_EN,
    documents: DOCUMENTS_EN,
    donate: DONATE_EN,
    courses: COURSES_EN,
    auth: AUTH_EN,
    notification: NOTIFICATION_EN,
    footer: FOOTER_EN,
    page404: PAGE404_EN,
    chat: CHAT_EN
  },
  
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  ns: [
    'navbar',
    'blogs',
    'account',
    'setting',
    'videos',
    'dashboardCreator',
    'contentCreator',
    'documents',
    'donate',
    'courses',
    'auth',
    'notification',
    'footer',
    'page404',
  ],
  debug: true, // Enable debug logs
  interpolation: {
    escapeValue: false,
  },
});

i18n.reloadResources(['en']);

export default i18n;
