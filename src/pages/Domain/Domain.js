import React from "react";
import './Dashboard.css';
import { useNavigate } from "react-router-dom";

const services = [
    {
        id: '/zenith/aic',
        title: 'ANDROID DEVELOPMENT',
        image: '/images/android.jpg',
    },
    {
        id: '/zenith/ml',
        title: 'MACHINE LEARNING',
        image: '/images/ml.jpg',
    },
    {
        id: '/zenith/riot',
        title: 'ROBOTICS & IOT',
        image: '/images/iot.jpg',
    },
    {
        id: '/zenith/vlsi',
        title: 'BLOCKCHAIN DEVELOPMENT',
        image: '/images/vlsi.webp',
    },
    {
        id: '/zenith/wd',
        title: 'WEB DEVELOPMENT',
        image: '/images/webdev.png',
    }
];

const Dashboard = () => {
    const navigate = useNavigate();

    const onSelect = (id) => {
        navigate(id);
        window.scrollTo(0, 0);
    };

    return (
        <div className="dashboard">
            {services.map((item) => (
                <div className="card" key={item.title} onClick={() => onSelect(item.id)}>
                    <div
                        className="card-image"
                        style={{ backgroundImage: `url(${item.image})` }}
                    />
                    <div className="card-content">
                        <h3>{item.title}</h3>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Dashboard;
