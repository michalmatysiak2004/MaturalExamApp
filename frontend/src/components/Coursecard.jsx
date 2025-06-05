import "../styles/Coursecard.css"; // import stylów
import { useNavigate } from "react-router-dom";
const Coursecard = ({ course, isOwned }) => {
  console.log("isOwned", isOwned);
  console.log("course", course);
  const navigate = useNavigate();
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
        <strong>Lekcje:</strong> {course.lessons}
      </p>
      <p>
        <strong>Czas trwania:</strong> {course.time} godzin
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
