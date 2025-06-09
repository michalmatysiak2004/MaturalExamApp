import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import api from "../api";
import { AuthContext } from "../components/AuthContext";
import Lessonlist from "../components/Lessonlist";
import Lesson from "../components/Lesson";
import "../styles/Course.css";
const Course = () => {
  const { courseId } = useParams();
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState(null);
  const { isLoggedIn, user, loadingUser } = useContext(AuthContext);
  const [currentLesson, setCurrentLesson] = useState(1);
  const [finishedLessons, setFinishedLessons] = useState([]);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await api.get("/api/course/" + courseId + "/");
        setCourse(response.data.course);
        setFinishedLessons(response.data.finished_lessons);
      } catch (error) {
        console.error("Error fetching course data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [isLoggedIn]);
  useEffect(() => {
    if (course?.belongto?.length > 0) {
      setCurrentLesson(course.belongto[0]);
    }
  }, [course]);

  if (loading || loadingUser) return <p>Ładowanie danych...</p>;
  return (
    <div className="course-page">
      
      <div className="content-wrapper">
        <Lessonlist
          lessons={course.belongto}
          onLessonClick={setCurrentLesson}
          finishedlessons={finishedLessons}
          coursename={course.name}
        />
        <div className="lesson-video">
          {currentLesson ? (
            <Lesson lesson={currentLesson} />
          ) : (
            <p>Wybierz lekcję</p>
          )}
        </div>
      </div>
    </div>
  );
};
export default Course;
