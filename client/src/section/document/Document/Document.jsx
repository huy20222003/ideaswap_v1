import { useState, useEffect } from 'react';
//mui
import { Card, Typography, Box, Pagination, Button, Stack } from '@mui/material';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
//component
import DocumentItem from './DocumentItem';
//context
import { useDocument, useCensorships, useUser } from '../../../hooks/context';
//i18n
import { useTranslation } from 'react-i18next';
//---------------------------------------------------

const Document = () => {
  const { t } = useTranslation('documents');
  const {
    documentState: { documents },
    handleGetAllDocuments,
  } = useDocument();
  const {
    censorshipsState: { censorships },
    handleGetAllCensorships,
  } = useCensorships();

  const { userState: { users }, handleGetAllUsers } = useUser();

  const [currentPage, setCurrentPage] = useState(1);
  const documentsPerPage = 5; // Set the number of documents per page

  // Calculate the indexes for slicing the documents array
  const indexOfLastDocument = currentPage * documentsPerPage;
  const indexOfFirstDocument = indexOfLastDocument - documentsPerPage;

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    handleGetAllDocuments();
    handleGetAllCensorships();
    handleGetAllUsers();
  }, [handleGetAllDocuments, handleGetAllCensorships, handleGetAllUsers]);

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

  const currentDocuments = newDocuments.slice(
    indexOfFirstDocument,
    indexOfLastDocument
  );

  return (
    <Card sx={{ p: '1rem' }}>
      <Box
        sx={{
          textAlign: 'center',
          bgcolor: 'primary.main',
          borderRadius: '0.4rem',
          py: '0.5rem',
        }}
      >
        <Typography variant="h5" sx={{ color: 'white' }}>
          {t("DOWNLOAD DOCUMENT FREE")}
        </Typography>
      </Box>
      <Box
        sx={{ display: 'flex', justifyContent: 'space-between', my: '1.5rem' }}
      >
        <Button
          component="label"
          variant="outlined"
          tabIndex={-1}
          startIcon={<FilterAltOutlinedIcon />}
        >
          {t("FILTER")}
        </Button>
      </Box>
      <Box>
        <Box>
          {newDocuments.length > 0 ? (
            <>
              {currentDocuments.map((document) => (
                <DocumentItem key={document?._id} document={document} />
              ))}
              <Stack sx={{ flexDirection: 'row', justifyContent: 'center' }}>
                <Pagination
                  count={Math.ceil(newDocuments.length / documentsPerPage)}
                  page={currentPage}
                  onChange={handlePageChange}
                  shape='rounded'
                />
              </Stack>
            </>
          ) : (
            <Typography variant="body1" sx={{ textAlign: 'center' }}>
              {t("There are no documents to download yet")}
            </Typography>
          )}
        </Box>
      </Box>
    </Card>
  );
};

export default Document;
