// import React , { useState, useEffect } from "react";
// import "./Events.css";
// import PastEvents from '../../components/PastEvents/PastEvents'

// import {getStorage, ref, getDownloadURL, listAll} from "firebase/storage";
// import {app} from '../../utils/firebase'

// const storage = getStorage(app)

// const pastEventsRef = ref(storage, 'Events/Past-Events');
// const upcomingEventsRef = ref(storage, 'Events/Upcoming-Events');

// const Events = () => {
//   const [pastEventPosters, setPastEventPosters] = useState([]);
//   const [upcomingEventPosters, setUpcomingEventPosters] = useState([]);

//   useEffect(() => {
//     listAll(pastEventsRef)
//     .then((res) => {
//       return Promise.all(res.items.map((itemRef) => getDownloadURL(itemRef)));
//     })
//     .then((urls) => {
//       setPastEventPosters(urls);
//     })
//     .catch((err) => console.error("Error fetching past event posters:", err));
//     // listAll(pastEventsRef)
//     //   .then((res) => {
//     //     const urls = [];
//     //     res.items.forEach((itemRef) => {
//     //       urls.push(getDownloadURL(itemRef));
//     //     });
//     //     return Promise.all(urls);
//     //   })
//     //   .then((urls) => {
//     //     setPastEventPosters(urls);
//     //   })
//     //   .catch((err) => console.log(err));

//     listAll(upcomingEventsRef)
//       .then((res) => {
//         const urls = [];
//         res.items.forEach((itemRef) => {
//           urls.push(getDownloadURL(itemRef));
//         });
//         return Promise.all(urls);
//       })
//       .then((urls) => {
//         setUpcomingEventPosters(urls);
//       })
//       .catch((err) => console.log(err));
//   }, []);

//   return (
//     <div className="wrapper">
//       <section className="upcoming-events">
//         <div className="title">
//           Upcoming Events & <span className="title-span">Workshops</span>
//         </div>
//         <PastEvents slides={upcomingEventPosters} />
//       </section>
//       <section className="upcoming-events">
//         <div className="title">
//           Past Events & <span className="title-span">Workshops</span>
//         </div>
//         <PastEvents slides={pastEventPosters} />
//       </section>
//     </div>
//   );
// };

// export default Events;




// // const pastEventPosters = [];
// // const upcomingEventPosters = [];

// // listAll(pastEventsRef)
// //   .then((res) => {
// //     res.items.forEach(itemRef => {
// //       return getDownloadURL(itemRef).then((url) => {
// //         pastEventPosters.push(url);
// //       })
// //     })
// //   }).catch(err => console.log(err))

// // listAll(upcomingEventsRef)
// //   .then((res) => {
// //     res.items.forEach(itemRef => {
// //       return getDownloadURL(itemRef).then((url) => {
// //         upcomingEventPosters.push(url);
// //       })
// //     })
// //   }).catch(err => console.log(err))

// // const Events = () => {
// //   return (
// //     <div className="wrapper">
// //       <section className="upcoming-events">
// //         <div className="title">
// //           Upcoming Events & <span className="title-span">Workshops</span>
// //         </div>
// //         <PastEvents slides={upcomingEventPosters}/>
// //       </section>
// //       <section className="upcoming-events">
// //         <div className="title">
// //           Past Events & <span className="title-span">Workshops</span>
// //         </div>
// //         <PastEvents slides={pastEventPosters}/>
// //       </section>
// //     </div>
// //   );
// // };

// // export default Events;

// // import React from "react";
// // import "./Events.css";
// // import { getFirestore, doc, getDoc } from 'firebase/firestore';
// // import { app } from '../../utils/firebase'; // Your Firebase app instance

// // const db = getFirestore(app);
// // const docRef = doc(db, 'Events', 'Past-Events', 'even1'); // Update with your document path
// // getDoc(docRef).then((doc) => {
// //   if (doc.exists()) {
// //     const posterUrl = doc.data().poster.url; // Access the URL
// //     console.log(posterUrl);
// //   } else {
// //     console.log('Document not found');
// //   }
// // });

// // export default Events;

import React, { useState, useEffect } from "react";
import "./Events.css";
import PastEvents from '../../components/PastEvents/PastEvents';
import { getStorage, ref, getDownloadURL, listAll } from "firebase/storage";
import { app } from '../../utils/firebase';

const storage = getStorage(app);

const pastEventsRef = ref(storage, 'Events/Past-Events');
const upcomingEventsRef = ref(storage, 'Events/Upcoming-Events');

const Events = () => {
  const [pastEventPosters, setPastEventPosters] = useState([]);
  const [upcomingEventPosters, setUpcomingEventPosters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosters = async () => {
      try {
        const [pastRes, upcomingRes] = await Promise.all([
          listAll(pastEventsRef),
          listAll(upcomingEventsRef),
        ]);

        const pastUrls = await Promise.all(pastRes.items.map((itemRef) => getDownloadURL(itemRef)));
        const upcomingUrls = await Promise.all(upcomingRes.items.map((itemRef) => getDownloadURL(itemRef)));

        setPastEventPosters(pastUrls);
        setUpcomingEventPosters(upcomingUrls);
      } catch (err) {
        setError("Failed to load event posters.");
        console.error("Error fetching event posters:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosters();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="wrapper">
      <section className="upcoming-events">
        <div className="title">
          Upcoming Events & <span className="title-span">Workshops</span>
        </div>
        <PastEvents slides={upcomingEventPosters} />
      </section>
      <section className="past-events">
        <div className="title">
          Past Events & <span className="title-span">Workshops</span>
        </div>
        <PastEvents slides={pastEventPosters} />
      </section>
    </div>
  );
};

export default Events;

