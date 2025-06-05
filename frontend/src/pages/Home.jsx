import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../components/AuthContext";
import api from "../api"; // twój axios instance
import Coursecard from "../components/Coursecard";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [ownedCourses, setOwnedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { isLoggedIn, user, loadingUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const homeResponse = await api.get("/api/home/");
        setCourses(homeResponse.data.courses || []);
        setOwnedCourses(homeResponse.data.owned_courses || []);
      } catch (err) {
        console.error("Błąd przy pobieraniu danych:", err);
        setError("Nie udało się załadować danych.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isLoggedIn]);

  if (loading || loadingUser) return <p>Ładowanie danych...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="home-page">
     
      <div className="courses-list">
        {courses.map((course) => (
          <Coursecard
            key={course.id}
            course={course}
            isOwned={ownedCourses.includes(course.id) ? true : false}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
