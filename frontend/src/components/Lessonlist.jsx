import "../styles/Lessonlist.css";
import { useState } from "react";


const Lessonlist = ({ lessons, onLessonClick, finishedlessons , coursename}) => {
 

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time - minutes * 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }
  return (
    <div className="lessonlist-list">
      
      <div className="lessonlist-scroll">
        <h2>{coursename}</h2>
        {lessons.map((lesson) => (
          <div
            key={lesson.id}
            className="lessonlist-item"
            onClick={() => onLessonClick(lesson)}
          >
            <div className="lessonlist-status">
              {finishedlessons.includes(lesson.id) ? (
                <span className="lessonlist-finished">✔️</span>
              ) : (
                <span className="lessonlist-notfinished">◯</span>
              )}
            </div>

            <div className="lessonlist-content">
              <span className="lessonlist-title">{lesson.name}</span>
              <span className="lessonlist-time">{formatTime(lesson.time)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Lessonlist;
