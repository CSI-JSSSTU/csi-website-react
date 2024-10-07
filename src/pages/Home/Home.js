import React, { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import './Home.css';
import CanvasComponent from '../../components/CanvasComponent/CanvasComponent';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faYoutube, faGithub, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Home = () => {
    const particlesInit = useCallback(async (engine) => {
        await loadFull(engine);
    }, []);

    const particlesLoaded = useCallback(async (container) => {
        // await console.log(container);
    }, []);

    return (
        <div>
            <div className="intro-page">
                <div className="canvas-container">
                    <CanvasComponent />
                </div>
                <div className="particles-container">
                    <Particles
                        id="tsparticles"
                        init={particlesInit}
                        loaded={particlesLoaded}
                        options={{
                            fpsLimit: 60,
                            interactivity: {
                                detectsOn: 'window',
                                events: {
                                    onHover: { enable: true, mode: 'repulse' },
                                    resize: true,
                                },
                                modes: {
                                    bubble: {
                                        distance: 400,
                                        duration: 2,
                                        opacity: 0.8,
                                        size: 40,
                                    },
                                    push: { particles_nb: 4 },
                                    repulse: { distance: 100, duration: 0.4 },
                                },
                            },
                            particles: {
                                color: { value: '#ffffff' },
                                links: { color: '#ffffff', distance: 150, enable: true, opacity: 0.5, width: 1 },
                                move: {
                                    bounce: false,
                                    direction: 'none',
                                    enable: true,
                                    outMode: 'bounce',
                                    random: false,
                                    speed: 1,
                                    straight: false,
                                },
                                number: { density: { enable: true, value_area: 800 }, value: 80 },
                                opacity: { value: 0.5 },
                                shape: { type: 'circle' },
                                size: { random: true, value: 5 },
                            },
                            detectRetina: true,
                        }}
                    />
                </div>
                <h1 className='motto-text'>Tech is FUN</h1>
            </div>

            <div className='about-section'>
                <h1 className='about-title'>ABOUT US</h1>
                <div className='about-flex-div'>
                    <p className='about-content'>
                        Computer Society of India is the only Technical club of the department of ISE in JSS Science and Technology University. CSI is an enthusiastic forum for students craving for technical exposure. CSI have conducted multiple sessions on various core domains that gives the ebullient engineers a wide exposure on how to approach concepts. On the whole it's a fun filled flexible club with a group of people more than willing to extend help to cheer and motivate the students on becoming technical masterminds.
                    </p>
                    <div className='about-right'>
                        <div className='join-us-div' style={{marginBottom: '10vh'}}>
                            <h1 className='about-sub-headings'>WANT TO BE A PRO</h1>
                            <button className="discord-button">
                                BECOME A MEMBER
                            </button>
                        </div>
                        <h1 className='about-sub-headings hide-title'>FOLLOW US</h1>
                        <div className='about-socials'>
                            <FontAwesomeIcon className='about-social-button' onClick={() => window.open('https://www.linkedin.com/company/techclub-ssn/')} icon={faLinkedin} size='2x' />
                            <FontAwesomeIcon className='about-social-button' onClick={() => window.open('https://www.youtube.com/@jssscienceandtechnologyuni567')} icon={faYoutube} size='2x' />
                            <FontAwesomeIcon className='about-social-button' onClick={() => window.open('https://github.com/CCCMKS')} icon={faGithub} size='2x' />
                            <FontAwesomeIcon className='about-social-button' onClick={() => window.open('https://www.instagram.com/csi_jssstu')} icon={faInstagram} size='2x' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;