import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import api from "../api";
import { AuthContext } from "../components/AuthContext";
import Lessonlist from "../components/Lessonlist"; // Importuj komponent LessonsList
const Course = () => {
  const { courseId } = useParams();
  console.log("courseId", courseId);
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState(null);
  const { isLoggedIn, user, loadingUser } = useContext(AuthContext);
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
    
  if (loading || loadingUser) return <p>Ładowanie danych...</p>;
  return (
    <div className="course-page">
      <h1>{course.name}</h1>
      {course && course.belongto && (
        <Lessonlist lessons={course.belongto} />
      )}
    </div>
  );
};
export default Course;
