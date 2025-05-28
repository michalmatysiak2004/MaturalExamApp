import React, { useContext, useEffect, useState } from 'react';
import api from '../api.js'; // ścieżka do Twojego pliku z axios (np. ./api/index.js)
import { AuthContext } from '../components/AuthContext.jsx';


const Home = () => {
  const [courses, setCourses] = useState([]);
  const [topics, setTopics] = useState([]);
  const [ownedCourses, setOwnedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null); // <-- stan dla użytkownika
  const {isLoggedIn}= useContext(AuthContext); // <-- stan dla zalogowania
  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const homePromise = await api.get('/api/home/');
        const userPromise = isLoggedIn ? await api.get('/api/user/') : Promise.resolve(null); // <-- pobieramy dane użytkownika
        const [homeResponse, userResponse] = await Promise.all([homePromise, userPromise]);
        console.log('Dane z API:', homeResponse.data);

        if(userResponse) {
        console.log('Dane użytkownika:', userResponse.data);
        setUser(userResponse.data); 
        setOwnedCourses(homeResponse.data.owned_courses || []);
        }
        setCourses(homeResponse.data.courses || []);
        
        
      } catch (err) {
        console.error('Błąd przy pobieraniu danych:', err);
        setError('Nie udało się załadować danych.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isLoggedIn]);

  if (loading) return <p>Ładowanie danych...</p>;
  if (error) return <p>{error}</p>;

  return (
  <div className="home-container">
    {user?.is_authenticated ? (
      <p>Witaj, {user.username}!</p>
    ):null}
    <h1>Witaj w kursach!</h1>
    <h2>Dostępne kursy</h2>
    <ul>
      {courses.map(course => (
        <li key={course.id}>
          {course.name}
          {ownedCourses.includes(course.id) && <strong> (Twoje)</strong>}
        </li>
      ))}
    </ul>
  </div>
)
}
export default Home;
