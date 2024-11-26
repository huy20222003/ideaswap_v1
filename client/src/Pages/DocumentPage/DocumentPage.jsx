//mui
import { Container, Box } from '@mui/material';
//component
import SearchDocument from '../../section/document/SearchDocument';
import Document from '../../section/document/Document';
//------------------------------------------------------------

const DocumentPage = () => {
  document.title = 'Document';
  return (
    <Container maxWidth="md">
      <Box>
        <SearchDocument />
      </Box>
      <Box>
        <Document />
      </Box>
    </Container>
  );
};

export default DocumentPage;
