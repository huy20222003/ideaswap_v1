import { createContext, useCallback, useReducer, useState } from 'react';
//reducer
import {
  initDocumentState,
  reducer,
} from '../Reducers/DocumentReducer/reducer';
import {
  addDocument,
  getAll,
  deleteDocument,
  searchDocument,
  updateDocument,
  getById,
} from '../Reducers/DocumentReducer/action';
//api
import documentApi from '../Service/documentApi';

export const DocumentContext = createContext();

export const DocumentProvider = (prop) => {
  const [documentState, dispatch] = useReducer(reducer, initDocumentState);
  const [openFormDialogAddDocument, setOpenFormDialogAddDocument] =
    useState(false);
  const [openFormDialogDeleteDocument, setOpenFormDialogDeleteDocument] =
    useState(false);
  const [openFormDialogEditDocument, setOpenFormDialogEditDocument] =
    useState(false);

  const handleError = useCallback((error) => {
    if (error.response && error.response.data) {
      return error.response.data;
    } else {
      return { success: false, message: error.message };
    }
  }, []);

  const handleGetAllDocuments = useCallback(async () => {
    try {
      const response = await documentApi.getAll();
      if (response.data.success) {
        dispatch(getAll(response.data.documents));
      }
    } catch (error) {
      return handleError(error);
    }
  }, [handleError]);

  const handleGetDocumentById = useCallback(
    async (documentId) => {
      try {
        const response = await documentApi.getById(documentId);
        if (response.data.success) {
          dispatch(getById(response.data.document));
        }
        return response.data;
      } catch (error) {
        return handleError(error);
      }
    },
    [handleError]
  );

  const handleSearchDocuments = useCallback(
    async (searchValue) => {
      try {
        if(searchValue != '') {
          const response = await documentApi.searchDocument(searchValue);
          if (response.data.success) {
            dispatch(searchDocument(response.data.documents));
          }
        } else {
          handleGetAllDocuments();
        }
      } catch (error) {
        return handleError(error);
      }
    },
    [handleError, handleGetAllDocuments]
  );

  const handleCreateDocument = useCallback(
    async (document, setProgressValue) => {
      try {
        // Bắt đầu upload, set giá trị tiến trình là 0
        setProgressValue(0);

        const response = await documentApi.createDocument(
          document,
          (progressEvent) => {
            // Xử lý tiến trình upload ở đây
            const progress = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100
            );
            setProgressValue(progress);
          }
        );

        if (response.data.success) {
          dispatch(addDocument(response.data.document));
        }
        return response.data;
      } catch (error) {
        return handleError(error);
      }
    },
    [dispatch, handleError]
  );

  const handleUpdateDocument = useCallback(
    async (documentId, document, setProgressValue) => {
      try {
        // Bắt đầu upload, set giá trị tiến trình là 0
        setProgressValue(0);

        const response = await documentApi.updateDocument(
          documentId,
          document,
          (progressEvent) => {
            // Xử lý tiến trình upload ở đây
            const progress = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100
            );
            setProgressValue(progress);
          }
        );

        if (response.data.success) {
          dispatch(updateDocument(response.data.document));
        }
        return response.data;
      } catch (error) {
        return handleError(error);
      }
    },
    [dispatch, handleError]
  );

  const handleUpdateCountDownloadDocument = useCallback(
    async (documentID, data) => {
      try {
        const response = await documentApi.updateDocument(documentID, data);
        if (response.data.success) {
          dispatch(updateDocument(response.data.document));
        }
        return response.data;
      } catch (error) {
        return handleError(error);
      }
    },
    [handleError]
  );

  const handleDeleteDocument = useCallback(
    async (documentID) => {
      try {
        const response = await documentApi.deleteDocument(documentID);
        if (response.data.success) {
          dispatch(deleteDocument(documentID));
        }
        return response.data;
      } catch (error) {
        return handleError(error);
      }
    },
    [handleError]
  );

  const courseData = {
    documentState,
    openFormDialogAddDocument,
    setOpenFormDialogAddDocument,
    openFormDialogDeleteDocument,
    setOpenFormDialogDeleteDocument,
    openFormDialogEditDocument,
    setOpenFormDialogEditDocument,
    handleGetAllDocuments,
    handleCreateDocument,
    handleDeleteDocument,
    handleSearchDocuments,
    handleUpdateDocument,
    handleGetDocumentById,
    handleUpdateCountDownloadDocument,
  };

  return (
    <DocumentContext.Provider value={courseData}>
      {prop.children}
    </DocumentContext.Provider>
  );
};
