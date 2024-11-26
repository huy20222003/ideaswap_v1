// @mui
import { Container, Box } from '@mui/material';
//component
import DocumentDetail from '../../section/document/DocumentDetail';
import RelatedDocument from '../../section/document/RelatedDocument';
// ----------------------------------------------------------------------

const DocumentDetailPage = () => {
  document.title = 'Document Detail';
  return (
    <>
      <Container maxWidth="xl">
        <Box>
          <DocumentDetail />
          <RelatedDocument />
        </Box>
      </Container>
    </>
  );
};

export default DocumentDetailPage;
