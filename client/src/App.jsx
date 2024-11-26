import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
//toast
import { ToastContainer } from 'react-toastify';
// routes
import Router from './routers/routes';
// theme
import ThemeProvider from './Theme';
// components
import ScrollToTop from './Components/scroll-to-top';
//check Internet
import { CheckInternet } from './Components/CheckInternet';
//context
import { CommonProvider } from './Contexts/CommonContext';
import { AuthProvider } from './Contexts/AuthContext';
import { BlogProvider } from './Contexts/BlogContext';
import { HeartProvider } from './Contexts/HeartContext';
import { CommentProvider } from './Contexts/CommentContext';
import { ShareProvider } from './Contexts/ShareContext';
import { UserProvider } from './Contexts/UserContext';
import { CourseProvider } from './Contexts/CourseContext';
import { VideoProvider } from './Contexts/VideoContext';
import { CensorshipsProvider } from './Contexts/CensorshipsContext';
import { FollowProvider } from './Contexts/FollowContext';
import { RoleProvider } from './Contexts/RoleContext';
import { CodeProvider } from './Contexts/CodeContext';
import { DocumentProvider } from './Contexts/DocumentContext';
import { BannerProvider } from './Contexts/BannerContext';
import { NotificationProvider } from './Contexts/NotificationContext';
import { SocketProvider } from './Contexts/SocketContext';
import { ConversationProvider } from './Contexts/ConversationContext';
import { MessageProvider } from './Contexts/MessageContext';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <ThemeProvider>
          <ToastContainer />
          <CheckInternet />
          <CommonProvider>
            <AuthProvider>
              <SocketProvider>
                <BlogProvider>
                  <HeartProvider>
                    <CommentProvider>
                      <ShareProvider>
                        <UserProvider>
                          <CourseProvider>
                            <VideoProvider>
                              <CensorshipsProvider>
                                <FollowProvider>
                                  <RoleProvider>
                                    <CodeProvider>
                                      <DocumentProvider>
                                        <BannerProvider>
                                          <NotificationProvider>
                                            <ConversationProvider>
                                              <MessageProvider>
                                              <Router />
                                              </MessageProvider>
                                            </ConversationProvider>
                                          </NotificationProvider>
                                        </BannerProvider>
                                      </DocumentProvider>
                                    </CodeProvider>
                                  </RoleProvider>
                                </FollowProvider>
                              </CensorshipsProvider>
                            </VideoProvider>
                          </CourseProvider>
                        </UserProvider>
                      </ShareProvider>
                    </CommentProvider>
                  </HeartProvider>
                </BlogProvider>
              </SocketProvider>
            </AuthProvider>
          </CommonProvider>
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}
