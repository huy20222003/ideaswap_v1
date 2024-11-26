//mui
import { Box, Card, Typography, Grid } from '@mui/material';
//component
import CourseItem from './CourseItem';
//propType
import PropTypes from 'prop-types';
//i18n
import { useTranslation } from 'react-i18next';
//--------------------------------------------------------

const CourseNew = ({ courseNewFilter }) => {
  const { t } = useTranslation('courses');
  return (
    <Box sx={{ mb: '1rem' }}>
      {courseNewFilter.length > 0 ? (
        <Card
          sx={{
            bgcolor: 'primary.main',
            p: '0.5rem 1rem',
            borderRadius: '0.4rem',
          }}
        >
          <Typography variant="subtitle1" sx={{ color: 'white' }}>
            {t('Course New')}
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
        {courseNewFilter.map((course) => (
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

CourseNew.propTypes = {
  courseNewFilter: PropTypes.array.isRequired,
};

export default CourseNew;
