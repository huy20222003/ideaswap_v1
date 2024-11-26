import { useEffect, useState, useCallback, startTransition } from 'react';
import { Container, Box, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MicIcon from '@mui/icons-material/Mic';
import { CourseNew, CourseTop, Courses } from '../../section/course';
import { useCourse } from '../../hooks/context';
//i18n
import { useTranslation } from 'react-i18next';
//--------------------------------------------------------------

const CoursePage = () => {
  document.title = 'Course';
  const {t} = useTranslation('courses');
  const {
    courseState: { courses },
    handleSearchCourses,
  } = useCourse();

  const [searchTerm, setSearchTerm] = useState('');
  const [courseNew, setCourseNew] = useState([]);
  const [courseTop, setCourseTop] = useState([]);

  const handleSearch = useCallback(async () => {
    try {
      await handleSearchCourses(searchTerm);
    } catch (error) {
      console.log(error);
    }
  }, [searchTerm, handleSearchCourses]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      handleSearch();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [handleSearch]);

  useEffect(() => {
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const courseNewFilter = courses.filter((course) => {
      const createdAtDate = new Date(course.createdAt);
      return createdAtDate >= oneMonthAgo && createdAtDate <= now;
    });
    setCourseNew(courseNewFilter);

    const courseTopFilter = courses
      .filter((course) => !courseNewFilter.includes(course))
      .sort((a, b) => b.view - a.view);
    setCourseTop(courseTopFilter);
  }, [courses]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const startSpeechRecognition = () => {
    var recognition = new webkitSpeechRecognition() || new SpeechRecognition();

    recognition.onresult = function (event) {
      var result = event.results[0][0].transcript;
      startTransition(() => setSearchTerm(result));
    };

    recognition.start();
  };

  return (
    <Container maxWidth="md" sx={{ mt: '5rem' }}>
      <Box sx={{ width: '100%', mb: '2rem' }}>
        <TextField
          variant="outlined"
          fullWidth
          size="small"
          sx={{ bgcolor: 'white', borderRadius: '0.5rem' }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <MicIcon
                  sx={{ cursor: 'pointer' }}
                  onClick={startSpeechRecognition}
                />
              </InputAdornment>
            ),
            placeholder: t("Search for courses")
          }}
          value={searchTerm}
          onChange={handleChange}
        />
      </Box>
      <Box>
        <CourseNew courseNewFilter={courseNew} />
      </Box>
      <Box>
        <CourseTop courseTopFilter={courseTop} />
      </Box>
      <Box>
        <Courses
          courses={courses.filter(
            (course) =>
              !courseNew.includes(course) && !courseTop.includes(course)
          )}
        />
      </Box>
    </Container>
  );
};

export default CoursePage;
