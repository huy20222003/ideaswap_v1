import { Box, Grid } from '@mui/material';
// components
import { ChatConversations, ChatInfo } from '../../section/chat';
import ChatSelected from '../../section/chat/ChatSelectedArea';
//----------------------------------------------------------

const ChatPage = () => {
  return (
    <Box sx={{ mt: '4.5rem' }}>
      <Grid container>
        <Grid item xs={12} sm={12} md={3} xl={3} lg={3}>
          <ChatConversations />
        </Grid>
        <Grid item xs={12} sm={12} md={6} xl={6} lg={6}>
          <ChatSelected />
        </Grid>
        <Grid item xs={12} sm={12} md={3} xl={3} lg={3}>
          <ChatInfo />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ChatPage;
