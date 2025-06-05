import '../styles/Lessonlist.css';

const Lessonlist = ({ lessons }) => {
  return (
    <div className="lesson-list">
      <h2>📘 Lekcje</h2>
      <div className="lesson-scroll">
        {lessons.map((lesson) => (
          <div key={lesson.id} className="lesson-item">
            <div className="lesson-dot" />
            <div className="lesson-content">
              <span className="lesson-title">{lesson.name}</span>
              <span className="lesson-time">{lesson.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Lessonlist;
