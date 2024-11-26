import {
  ADD_DOCUMENT,
  DELETE_DOCUMENT,
  GET_ALL_DOCUMENT,
  GET_DOCUMENT_BY_ID,
  SEARCH_DOCUMENT,
  UPDATE_DOCUMENT,
} from './constants';

export const initDocumentState = {
  document: null,
  documents: [],
};

export const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_DOCUMENT:
      return {
        ...state,
        documents: payload,
      };
    case GET_DOCUMENT_BY_ID:
      return {
        ...state,
        document: payload,
      };
    case SEARCH_DOCUMENT:
      return {
        ...state,
        documents: payload,
      };
    case ADD_DOCUMENT:
      return {
        ...state,
        documents: [...state.documents, payload],
      };
    case UPDATE_DOCUMENT:
      const newDocuments = state.documents.map((document) =>
        document._id === payload._id ? payload : document
      );

      return {
        ...state,
        documents: newDocuments,
      };
    case DELETE_DOCUMENT:
      return {
        ...state,
        documents: state.documents.filter(
          (document) => document._id !== payload
        ),
      };
    default:
      return {
        ...state,
      };
  }
};
