import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import api from "../api";
import { AuthContext } from "../components/AuthContext";
import Lessonlist from "../components/Lessonlist"; 
import Lesson from "../components/Lesson"; // Importuj komponent Lesson
import '../styles/Course.css';  
const Course = () => {
  const { courseId } = useParams();
  console.log("courseId", courseId);
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState(null);
  const { isLoggedIn, user, loadingUser } = useContext(AuthContext);
  const [currentLesson, setCurrentLesson] = useState(1);
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await api.get("/api/course/" + courseId + "/");
        setCourse(response.data.course);
        console.log("Fetched course data:", response.data);
      } catch (error) {
        console.error("Error fetching course data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  },[isLoggedIn] );
  useEffect(() => {
  if (course?.belongto?.length > 0) {
    setCurrentLesson(course.belongto[0]);
  }
}, [course]);  

  if (loading || loadingUser) return <p>Ładowanie danych...</p>;
  return (
  <div className="course-page">
    <h1>{course.name}</h1>
    <div className="content-wrapper">
      <Lessonlist lessons={course.belongto} onLessonClick={setCurrentLesson} />
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
