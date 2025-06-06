import { useEffect } from "react";
import "../styles/Coursecard.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const Coursecard = ({ course, isOwned }) => {
  const [coursetime, setCourseTime] = useState(0);

  const [lessoncount, setLessonCount] = useState(0);
  useEffect(() => {
    if (Array.isArray(course.belongto)) {
      setLessonCount(course.belongto.length);
      setCourseTime(calculateTotalTime(course.belongto));
    } else {
      setLessonCount(0);
      setCourseTime(0);
    }
  }, [course.belongto]);

  const navigate = useNavigate();

  function calculateTotalTime(lessons) {
    let total = lessons.reduce((sum, lesson) => sum + Number(lesson.time), 0);
    total = total / 3600; 
    let totalRounded = Math.round(total) / 1; 
    return  totalRounded
  }

  function buyCourse(courseId) {
    navigate(`/buy-course/${courseId}`);
  }
  function handlePreview(courseId) {
    navigate(`/course/${courseId}`);
  }
  return (
    <div className="course-card">
      <div className="course-header">
        <h1>
          {course.name} <span className="math-symbol">π</span>
        </h1>
      </div>
      <p className="description">{course.description}</p>
      <p>
        <strong>Cena:</strong> {course.prize} PLN
      </p>
      <p>
        <strong>Lekcje:</strong> {lessoncount}{" "}
      </p>
      <p>
        <strong>Czas trwania:</strong> {coursetime} godzin
      </p>

      <div className="buttons">
        <button
          className="preview-button"
          onClick={() => handlePreview(course.id)}
        >
          Podgląd kursu
        </button>
        {!isOwned ? (
          <button className="buy-button" onClick={() => buyCourse(course.id)}>
            Kup Teraz
          </button>
        ) : (
          <p className="owned-text">✅ Posiadasz dostęp</p>
        )}
      </div>
    </div>
  );
};

export default Coursecard;
