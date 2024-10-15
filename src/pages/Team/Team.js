import React from "react";
import { useState, useEffect, useRef } from "react";
import './Team.css';
import TeamCard from '../../components/TeamCard/TeamCard'


function useOnScreen(ref, rootMargin = "0px") {
  const [isIntersecting, setIntersecting] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting);
      },
      {
        rootMargin,
      }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
  }, []);
  return isIntersecting;
}

const Team = (data) => {
  const coreRef = useRef();
  const techRef = useRef();
  const creativeRef = useRef();
  const editorialRef = useRef();
  const publicityRef = useRef();
  const eventRef = useRef();

  const coreOnScreen = useOnScreen(coreRef, "-50%");

  return (
    <div className='teams-page'>
      {/* Core Section */}
      <div className='team-section' ref={coreRef}>
        <div className='section-title-div'>
          <div className={coreOnScreen ? 'bubble-bg bubble-left-in' : 'hide-content'}></div>
          <div className={coreOnScreen ? 'title-text-div' : 'title-text-div hide-content'}>
            <h1 className='section-title-text gray'>Core</h1>
          </div>
        </div>
        <div className={coreOnScreen ? 'team-contents' : 'team-contents hide-content'}>
          {data.coreData.map((item, idx) => (
            <TeamCard data={item} idx={idx} />
          ))}
        </div>
      </div>

      {/* Technical Section */}
      <div className='team-section' ref={techRef}>
        <div className='section-title-div'>
          <div className={coreOnScreen ? 'bubble-bg bubble-left-in' : 'hide-content'}></div>
          <div className={coreOnScreen ? 'title-text-div' : 'title-text-div hide-content'}>
            <h1 className='section-title-text gray'>Technical</h1>
          </div>
        </div>
        <div className={coreOnScreen ? 'team-contents' : 'team-contents hide-content'}>
          {data.technicalData.map((item, idx) => (
            <TeamCard data={item} idx={idx} />
          ))}
        </div>
      </div>

      {/* Creative Section */}
      <div className='team-section' ref={creativeRef}>
        <div className='section-title-div'>
          <div className={coreOnScreen ? 'bubble-bg bubble-left-in' : 'hide-content'}></div>
          <div className={coreOnScreen ? 'title-text-div' : 'title-text-div hide-content'}>
            <h1 className='section-title-text gray'>Creative</h1>
          </div>
        </div>
        <div className={coreOnScreen ? 'team-contents' : 'team-contents hide-content'}>
          {data.creativeData.map((item, idx) => (
            <TeamCard data={item} idx={idx} />
          ))}
        </div>
      </div>

      {/* Editorial Section */}
      <div className='team-section' ref={editorialRef}>
        <div className='section-title-div'>
          <div className={coreOnScreen ? 'bubble-bg bubble-left-in' : 'hide-content'}></div>
          <div className={coreOnScreen ? 'title-text-div' : 'title-text-div hide-content'}>
            <h1 className='section-title-text gray'>Editorial</h1>
          </div>
        </div>
        <div className={coreOnScreen ? 'team-contents' : 'team-contents hide-content'}>
          {data.editorialData.map((item, idx) => (
            <TeamCard data={item} idx={idx} />
          ))}
        </div>
      </div>

      {/* Publicity Section */}
      <div className='team-section' ref={publicityRef}>
        <div className='section-title-div'>
          <div className={coreOnScreen ? 'bubble-bg bubble-left-in' : 'hide-content'}></div>
          <div className={coreOnScreen ? 'title-text-div' : 'title-text-div hide-content'}>
            <h1 className='section-title-text gray'>Publicity</h1>
          </div>
        </div>
        <div className={coreOnScreen ? 'team-contents' : 'team-contents hide-content'}>
          {data.publicityData.map((item, idx) => (
            <TeamCard data={item} idx={idx} />
          ))}
        </div>
      </div>

      {/* Event Section */}
      <div className='team-section' ref={eventRef}>
        <div className='section-title-div'>
          <div className={coreOnScreen ? 'bubble-bg bubble-left-in' : 'hide-content'}></div>
          <div className={coreOnScreen ? 'title-text-div' : 'title-text-div hide-content'}>
            <h1 className='section-title-text gray'>Event</h1>
          </div>
        </div>
        <div className={coreOnScreen ? 'team-contents' : 'team-contents hide-content'}>
          {data.eventData.map((item, idx) => (
            <TeamCard data={item} idx={idx} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Team;
