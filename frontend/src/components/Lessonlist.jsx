import '../styles/Lessonlist.css';

const Lessonlist = ({ lessons, onLessonClick }) => {
  return (
    <div className="lessonlist-list">
      <h2>📘 Lekcje</h2>
      <div className="lessonlist-scroll">
        {lessons.map((lesson) => (
          <div key={lesson.id} className="lessonlist-item"
            onClick={() => onLessonClick(lesson)}>
            <div className="lessonlist-dot" />
            <div className="lessonlist-content">
              <span className="lessonlist-title">{lesson.name}</span>
              <span className="lessonlist-time">{lesson.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Lessonlist;
