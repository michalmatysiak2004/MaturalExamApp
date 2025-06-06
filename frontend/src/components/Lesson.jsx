const Lesson = ({ lesson }) => {
    console.log("Lesson component received lesson:", lesson);
      if (!lesson) return <div>Brak danych o lekcji</div>;
  return (
    <div className="lesson">
        
      <span className="lesson-title">{lesson.name}</span>
      <span className="lesson-time">{lesson.description}</span>
    </div>
  );
};

export default Lesson;