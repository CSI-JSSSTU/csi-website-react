import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authProvider';
import './Events.css'; // Import the CSS file

const Events = () => {
  const { user } = useContext(AuthContext); // Get user information from AuthContext
  const navigate = useNavigate(); // useNavigate hook to redirect
  const [upcomingIndex, setUpcomingIndex] = useState(0);
  const [pastIndex, setPastIndex] = useState(0);
  const [events, setEvents] = useState({
    upcoming: [],
    past: []
  });

  useEffect(() => {
    setEvents({
      upcoming: [
        {
          id: 1,
          title: "Tech Conference 2024",
          description: "Join us for a day of cutting-edge technology discussions, networking, and hands-on workshops with industry experts",
          date: "Nov 15, 2024",
          time: "9:00 AM",
          location: "Convention Center",
          imageUrl: "https://via.placeholder.com/300x200", // Replace with actual image URL
          formLink: "https://forms.google.com/techconf2024",
        },
        {
          id: 2,
          title: "Startup Meetup",
          description: "Connect with fellow entrepreneurs and investors in this exclusive networking event focused on technology startups.",
          date: "Dec 1, 2024",
          time: "2:00 PM",
          location: "Innovation Hub",
          imageUrl: "https://via.placeholder.com/300x200", // Replace with actual image URL
          formLink: "https://forms.google.com/startupmeetup",
        },
        {
          id: 3,
          title: "AI Workshop",
          description: "Learn about the latest developments in AI and machine learning through interactive sessions and practical demonstrations.",
          date: "Dec 10, 2024",
          time: "10:00 AM",
          location: "Tech Campus",
          imageUrl: "https://via.placeholder.com/300x200", // Replace with actual image URL
          formLink: "https://forms.google.com/aiworkshop",
        }
      ],
      past: [
        {
          id: 4,
          title: "Web Dev Summit",
          description: "A comprehensive overview of modern web development practices and emerging technologies.",
          imageUrl: "https://via.placeholder.com/300x200", // Replace with actual image URL
          instaLink: "https://www.instagram.com/p/webdevsummit",
        },
        {
          id: 5,
          title: "Design Workshop",
          description: "Creative sessions exploring UI/UX principles and design thinking methodologies.",
          imageUrl: "https://via.placeholder.com/300x200", // Replace with actual image URL
          instaLink: "https://www.instagram.com/p/designworkshop",
        },
        {
          id: 6,
          title: "Coding Bootcamp",
          description: "Intensive hands-on coding sessions covering full-stack development fundamentals.",
          imageUrl: "https://via.placeholder.com/300x200", // Replace with actual image URL
          instaLink: "https://www.instagram.com/p/codingbootcamp",
        }
      ]
    });
  }, []);

  const handleRegisterClick = (url) => {
    if (user) { // Check if the user is signed in
      window.open(url, '_blank');
    } else {
      alert('Please sign in to register for events.'); // Alert to sign in
      navigate('/signinup'); // Redirect to SignInUp page
    }
  };

  const handleInstaClick = (url) => {
    window.open(url, '_blank');
  };
  const UpcomingEventCard = ({ event }) => (
    <div className="event-card" onClick={(e) => e.stopPropagation()}>
      <div className="card-container">
        <div className="card-image">
          <img src={event.imageUrl} alt={event.title} />
        </div>
        <div className="card-Content">
          <h3 className="card-title">{event.title}</h3>
          <p className="card-description">{event.description}</p>
          <div className="event-details">
            <div className="detail-item">
              <span className="icon">📅</span>
              <span>{event.date}</span>
            </div>
            <div className="detail-item">
              <span className="icon">⏰</span>
              <span>{event.time}</span>
            </div>
            <div className="detail-item">
              <span className="icon">📍</span>
              <span>{event.location}</span>
            </div>
          </div>
          <button className="register-button" onClick={() => handleRegisterClick(event.formLink)}>Register Now</button>
        </div>
      </div>
    </div>
  );

  const PastEventCard = ({ event }) => (
    <div className="event-card" onClick={(e) => e.stopPropagation()}>
      <div className="card-container">
        <div className="card-image">
          <img src={event.imageUrl} alt={event.title} />
        </div>
        <div className="card-Content">
          <h3 className="card-title">{event.title}</h3>
          <p className="card-description">{event.description}</p>
          <button className="instagram-button" onClick={() => handleInstaClick(event.instaLink)}>View on Instagram</button>
        </div>
      </div>
    </div>
  );

  const SliderSection = ({ title, events, currentIndex, setIndex, EventCardComponent }) => (
    <div className="slider-section">
      <h2 className="section-title">{title}</h2>
      <div className="slider-container">
        <div className="slider-wrapper">
          <div 
            className="slider-content"
            style={{ transform: `translateX(-${currentIndex * 288}px)` }}
          >
            {events.map((event) => (
              <EventCardComponent key={event.id} event={event} />
            ))}
          </div>
        </div>
        {currentIndex > 0 && (
          <button
            onClick={() => setIndex(currentIndex - 1)}
            className="slider-button left"
          >
            &#8249;
          </button>
        )}
        {currentIndex < events.length - 1 && (
          <button
            onClick={() => setIndex(currentIndex + 1)}
            className="slider-button right"
          >
            &#8250;
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="events-page">
      <h1 className="section-title">Events</h1>
      <SliderSection
        title="Upcoming Events"
        events={events.upcoming}
        currentIndex={upcomingIndex}
        setIndex={setUpcomingIndex}
        EventCardComponent={UpcomingEventCard}
      />
      <SliderSection
        title="Past Events"
        events={events.past}
        currentIndex={pastIndex}
        setIndex={setPastIndex}
        EventCardComponent={PastEventCard}
      />
    </div>
  );
};

export default Events;
