//react
import { useEffect, useState } from 'react';
//mui
import { Box, Card, Typography, Pagination, Stack, Grid } from '@mui/material';
//context
import { useDocument, useUser, useCensorships } from '../../../hooks/context';
//i18n
import { useTranslation } from 'react-i18next';
//component
import RelatedDocumentItem from './RelatedDocumentItem';
//--------------------------------------------------

const RelatedDocument = () => {
  const { t } = useTranslation('documents');

  const {
    documentState: { document, documents },
    handleGetAllDocuments,
  } = useDocument();

  const {
    censorshipsState: { censorships },
    handleGetAllCensorships,
  } = useCensorships();

  const {
    userState: { users },
    handleGetAllUsers,
  } = useUser();

  useEffect(() => {
    handleGetAllDocuments();
    handleGetAllCensorships();
    handleGetAllUsers();
  }, [handleGetAllCensorships, handleGetAllDocuments, handleGetAllUsers]);

  const [currentPage, setCurrentPage] = useState(1);
  const documentsPerPage = 5;

  const indexOfLastDocument = currentPage * documentsPerPage;
  const indexOfFirstDocument = indexOfLastDocument - documentsPerPage;

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const newDocuments = documents
    .map((document) => {
      const censorshipItem = censorships.find(
        (item) => item?.contentID === document?._id
      );
      const status = censorshipItem ? censorshipItem.status : 'pending';
      return {
        ...document,
        status,
      };
    })
    .filter((document) => document?.status === 'approved')
    .map((document) => {
      const user = users.find((user) => user?._id === document?.userID);
      return {
        ...document,
        user,
      };
    });

  const currentTitleWords = document?.title?.split(' ') || [];

  const relatedDocuments = newDocuments.filter((d) => {
    const isNotCurrentDocument = d?._id !== document?._id;
    const titleContainsWord = currentTitleWords.some((word) =>
      d.title.includes(word)
    );
    return isNotCurrentDocument && titleContainsWord;
  });

  const currentDocuments = relatedDocuments.slice(
    indexOfFirstDocument,
    indexOfLastDocument
  );

  return (
    <Box sx={{ mt: '2rem' }}>
      <Card
        sx={{
          bgcolor: 'primary.main',
          p: '0.5rem 1rem',
          borderRadius: '0.4rem',
        }}
      >
        <Typography variant="subtitle1" sx={{ color: 'white' }}>
          {t('Related Document')}
        </Typography>
      </Card>

      {relatedDocuments.length > 0 ? (
        <>
          <Grid container spacing={2}>
            {currentDocuments.map((document) => (
              <Grid key={document?._id} item xs={12} sm={6} md={6} lg={4}>
                <RelatedDocumentItem
                  key={document?._id}
                  _id={document?._id}
                  imageUrl={document?.imageUrl}
                  title={document?.title}
                  description={document?.description}
                  countDownload={document?.countDownload}
                  user={document?.user}
                  fileUrl={document?.fileUrl}
                />
              </Grid>
            ))}
          </Grid>
          <Stack spacing={2} sx={{ mt: '2rem', alignItems: 'center', justifyContent: 'center' }}>
            <Pagination
              count={Math.ceil(relatedDocuments.length / documentsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
            />
          </Stack>
        </>
      ) : (
        <Typography variant="body1" sx={{ mt: '1rem' }}>
          {t('No related documents found.')}
        </Typography>
      )}
    </Box>
  );
};

export default RelatedDocument;