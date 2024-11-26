//react
import { useEffect, useState, useCallback } from 'react';
//mui
import {
  Box,
  Popover,
  Menu,
  MenuItem,
  IconButton,
  Card,
  CardContent,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  MoreVert as MoreVertIcon,
  Visibility as VisibilityIcon,
} from '@mui/icons-material';
//context
import { useDocument, useAuth, useCensorships } from '../../../hooks/context';
//ultils
import { fShortenNumber } from '../../../utils/formatNumber';
import { fDateTime } from '../../../utils/formatTime';
//component
import FormDialogEditDocument from '../../../Components/FormDialog/document/FormDialogEditDocument';
import FormDialogDeleteDocument from '../../../Components/FormDialog/document/FormDialogDeleteDocument';
import HTMLReactParser from 'html-react-parser';
//i18n
import { useTranslation } from 'react-i18next';
//--------------------------------------------------

const DocumentManage = () => {
  const {
    documentState: { documents },
    setOpenFormDialogDeleteDocument,
    setOpenFormDialogEditDocument,
    handleGetDocumentById,
    handleGetAllDocuments,
  } = useDocument();
  const {t} = useTranslation('contentCreator');
  const {
    authState: { user },
  } = useAuth();
  const { censorshipsState, handleGetAllCensorships } = useCensorships();
  const [documentId, setDocumentId] = useState('');

  useEffect(() => {
    handleGetAllDocuments();
    handleGetAllCensorships();
  }, [handleGetAllCensorships, handleGetAllDocuments]);

  const documentsFilterByUserID = documents.filter(
    (video) => video.userID === user?._id
  );

  const { censorships } = censorshipsState;

  const documentsWithStatus = documentsFilterByUserID.map((document) => {
    const censorshipItem = censorships.find(
      (item) => item?.contentID === document?._id
    );
    const status = censorshipItem ? censorshipItem.status : 'pending';
    return {
      ...document,
      status,
    };
  });

  const columns = [
    {
      field: 'imageUrl',
      headerName: t("Image"),
      type: 'String',
      width: 150,
      renderCell: (params) => (
        <img
          src={params.value}
          alt="Image"
          style={{ width: '60%', height: '100%' }}
        />
      ),
    },
    { field: 'title', headerName: t("Title"), type: 'String', width: 300 },
    {
      field: 'description',
      headerName: t("Description"),
      type: 'String',
      width: 250,
      renderCell: (params) => HTMLReactParser(params.value),
    },
    {
      field: 'status',
      headerName: t("Status"),
      type: 'String',
      width: 100,
    },
    {
      field: 'download',
      headerName: t("Download"),
      type: 'String',
      width: 150,
    },
    {
      field: 'createdAt',
      headerName: t("CreatedAt"),
      type: 'String',
      width: 150,
    },
    {
      field: 'actions',
      headerName: t("Actions"),
      width: 90,
      renderCell: ActionsCell,
    },
  ];

  function ActionsCell(params) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
      <div>
        <IconButton
          onClick={handleClick}
          aria-label="More"
          aria-controls="menu-actions"
          aria-haspopup="true"
        >
          <MoreVertIcon />
        </IconButton>
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'center',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          PaperProps={{ style: { boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' } }}
        >
          <Menu
            id="menu-actions"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={() => handleView(params.row)}>
              <VisibilityIcon sx={{ paddingRight: '0.5rem' }} />
              {t("View")}
            </MenuItem>
            <MenuItem onClick={() => handleEdit(params.row.id)}>
              <EditIcon sx={{ paddingRight: '0.5rem' }} />
              {t("Edit")}
            </MenuItem>
            <MenuItem onClick={() => handleDelete(params.row.id)}>
              <DeleteIcon sx={{ paddingRight: '0.5rem' }} />
              {t("Delete")}
            </MenuItem>
          </Menu>
        </Popover>
      </div>
    );
  }

  const rows =
    documentsWithStatus &&
    documentsWithStatus.map((document) => {
      return {
        _id: document?._id,
        imageUrl: document?.imageUrl,
        title: document?.title,
        description: document?.description,
        fileUrl: document?.fileUrl,
        status: document?.status,
        download: fShortenNumber(document?.countDownload),
        createdAt: fDateTime(document?.createdAt),
      };
    });

  const handleView = useCallback((rowValue) => {
    const newTab = window.open(rowValue?.fileUrl, '_blank');
    if (newTab) {
      newTab.focus(); // Tự động chuyển focus vào tab mới nếu được mở thành công
    } else {
      console.error('Failed to open new tab'); // Xử lý khi mở tab mới thất bại
    }
  }, []);

  const handleEdit = useCallback(
    async (documentId) => {
      const response = await handleGetDocumentById(documentId);
      if (response.success) {
        setOpenFormDialogEditDocument(true);
      }
    },
    [handleGetDocumentById, setOpenFormDialogEditDocument]
  );

  const handleDelete = (documentId) => {
    setDocumentId(documentId);
    setOpenFormDialogDeleteDocument(true);
  };

  return (
    <Box>
      <Card>
        <CardContent>
          <DataGrid
            rows={rows.map((row) => ({ ...row, id: row._id }))}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </CardContent>
      </Card>
      <FormDialogEditDocument />
      <FormDialogDeleteDocument documentId={documentId} />
    </Box>
  );
};

export default DocumentManage;
