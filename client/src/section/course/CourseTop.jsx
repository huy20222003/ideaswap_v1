//mui
import { Box, Card, Typography, Grid } from '@mui/material';
//component
import CourseItem from './CourseItem';
//propType
import PropTypes from 'prop-types';
//i18n
import { useTranslation } from 'react-i18next';
//--------------------------------------------------------

const CourseTop = ({ courseTopFilter }) => {
  const {t} = useTranslation('courses');
  return (
    <Box sx={{ mb: '1rem' }}>
      {courseTopFilter.length > 0 ? (
        <Card
          sx={{
            bgcolor: 'primary.main',
            p: '0.5rem 1rem',
            borderRadius: '0.4rem',
          }}
        >
          <Typography variant="subtitle1" sx={{ color: 'white' }}>
            {t("Course Top")}
          </Typography>
        </Card>
      ) : (
        ''
      )}
      <Grid
        container
        sx={{
          flexDirection: {
            xs: 'column',
            sm: 'column',
            md: 'row',
            xl: 'row',
            lg: 'row',
          },
          alignItems: { xs: 'center', sm: 'center' },
        }}
      >
        {courseTopFilter.map((course) => (
          <Grid key={course._id} item xl={4} md={6} sm={12} xs={12}>
            <CourseItem
              _id={course._id}
              imageUrl={course.imageUrl}
              title={course.title}
              description={course.description}
              view={course.view}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

CourseTop.propTypes = {
  courseTopFilter: PropTypes.array.isRequired,
};

export default CourseTop;
