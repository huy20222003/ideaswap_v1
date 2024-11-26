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
} from '@mui/icons-material';
//react-player
import ReactPlayer from 'react-player/youtube';
//context
import { useVideo, useCensorships, useAuth } from '../../../hooks/context';
//ultils
import { fShortenNumber } from '../../../utils/formatNumber';
//component
import FormDialogEditVideo from '../../../Components/FormDialog/creator/FormDialogEditVideo';
import FormDialogDeleteVideo from '../../../Components/FormDialog/creator/FormDialogDeleteVideo';
//i18n
import { useTranslation } from 'react-i18next';
//--------------------------------------------------

const VideoManage = () => {
  const {
    videoState: { videos },
    setOpenFormDialogEditvideo,
    setOpenFormDialogDeletevideo,
    handleGetAllVideo,
    handleGetVideoById,
  } = useVideo();
  const {t} = useTranslation('contentCreator');
  const {
    authState: { user },
  } = useAuth();

  const { censorshipsState, handleGetAllCensorships } = useCensorships();
  const [videoId, setVideoId] = useState('');

  useEffect(() => {
    handleGetAllVideo();
    handleGetAllCensorships();
  }, [handleGetAllCensorships, handleGetAllVideo]);

  const videosFilterByUserID = videos.filter(
    (video) => video.userID === user?._id
  );

  const { censorships } = censorshipsState;
  const videosWithStatus = videosFilterByUserID.map((video) => {
    const censorshipItem = censorships.find(
      (item) => item?.contentID === video?._id
    );
    const status = censorshipItem ? censorshipItem.status : 'pending';
    return {
      ...video,
      status,
    };
  });

  const columns = [
    {
      field: 'videoUrl',
      headerName: t("Video"),
      type: 'String',
      width: 150,
      renderCell: (params) => (
        <ReactPlayer url={params.value} width="70%" height="3rem" controls />
      ),
    },
    { field: 'title', headerName: t("Title"), type: 'String', width: 300 },
    {
      field: 'status',
      headerName: t("Status"),
      type: 'String',
      width: 150,
    },
    {
      field: 'view',
      headerName: t("Views"),
      type: 'String',
      width: 150,
    },
    {
      field: 'heart',
      headerName: t("Hearts"),
      type: 'String',
      width: 150,
    },
    {
      field: 'comment',
      headerName: t("Comments"),
      type: 'String',
      width: 150,
    },
    {
      field: 'actions',
      headerName: 'Actions',
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
    videosWithStatus &&
    videosWithStatus.map((video) => {
      return {
        _id: video?._id,
        videoUrl: video?.videoUrl,
        title: video?.title,
        status: video?.status,
        view: fShortenNumber(video?.view),
        heart: fShortenNumber(0),
        comment: fShortenNumber(0),
      };
    });

  const handleEdit = useCallback(
    async (videoId) => {
      const response = await handleGetVideoById(videoId);
      if (response.success) {
        setOpenFormDialogEditvideo(true);
      }
    },
    [handleGetVideoById, setOpenFormDialogEditvideo]
  );

  const handleDelete = (videoId) => {
    setVideoId(videoId);
    setOpenFormDialogDeletevideo(true);
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
      <FormDialogEditVideo />
      <FormDialogDeleteVideo videoId={videoId} />
    </Box>
  );
};

export default VideoManage;
