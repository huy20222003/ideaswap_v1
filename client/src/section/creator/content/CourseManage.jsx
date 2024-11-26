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
//context
import { useCourse, useAuth } from '../../../hooks/context';
//ultils
import { fShortenNumber } from '../../../utils/formatNumber';
import { fDateTime } from '../../../utils/formatTime';
//component
import FormDialogDeleteCourse from '../../../Components/FormDialog/creator/FormDialogDeleteCourse';
import FormDialogEditCourse from '../../../Components/FormDialog/creator/FormDialogEditCourse';
import HTMLReactParser from 'html-react-parser';
//i18n
import { useTranslation } from 'react-i18next';
//--------------------------------------------------

const CourseManage = () => {
  const {
    courseState: { courses },
    handleGetAllCourses,
    setOpenFormDialogDeleteCourse,
    setOpenFormDialogEditCourse,
    handleGetCourseById,
  } = useCourse();
  const {t} = useTranslation('dashboardCreator');
  const {
    authState: { user },
  } = useAuth();
  const [courseId, setCourseId] = useState('');

  useEffect(() => {
    handleGetAllCourses();
  }, [handleGetAllCourses]);

  const coursesFilterByUserID = courses.filter(
    (course) => course.userID === user?._id
  );

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
      field: 'view',
      headerName: t("Views"),
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
    coursesFilterByUserID &&
    coursesFilterByUserID.map((course) => {
      return {
        _id: course?._id,
        imageUrl: course?.imageUrl,
        title: course?.title,
        description: course?.description,
        view: fShortenNumber(course?.view),
        createdAt: fDateTime(course?.createdAt),
      };
    });

  const handleEdit = useCallback(
    async (courseId) => {
      const response = await handleGetCourseById(courseId);
      if (response.success) {
        setOpenFormDialogEditCourse(true);
      }
    },
    [handleGetCourseById, setOpenFormDialogEditCourse]
  );

  const handleDelete = (courseId) => {
    setCourseId(courseId);
    setOpenFormDialogDeleteCourse(true);
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
      <FormDialogEditCourse />
      <FormDialogDeleteCourse courseId={courseId} />
    </Box>
  );
};

export default CourseManage;
