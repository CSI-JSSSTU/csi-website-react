import { useEffect, useState } from 'react';
import Papa from 'papaparse';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { AuthContextProvider } from './context/authProvider';

import NavBar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Events from './pages/Events/Events';
import Blogs from './pages/Blogs/Blogs';
import Hackinfinity from './pages/Events/Hackinfinity/Hackinfinity';
import Team from './pages/Team/Team';
import Dashboard from './pages/Dashboard/Dashboard';
import Domain from './pages/Domain/Domain';

function App() {
  // Single file for all team sections
  const team_file = '/csiteam.csv';

  // Define state for each section
  const [data, setData] = useState({
    coreData: [],
    technicalData: [],
    creativeData: [],
    editorialData: [],
    publicityData: [],
    eventData: [],
  });

  // Helper function to parse CSV files
  const parseCSV = (file) => {
    Papa.parse(file, {
      download: true,
      header: true,
      complete: (parsed) => {
        const sortedData = {
          coreData: [],
          technicalData: [],
          creativeData: [],
          editorialData: [],
          publicityData: [],
          eventData: [],
        };

        // Sort data based on domain
        parsed.data.forEach(item => {
          if (item.domain === 'Core') {
            sortedData.coreData.push(item);
          } else if (item.domain === 'Technical') {
            sortedData.technicalData.push(item);
          } else if (item.domain === 'Creative') {
            sortedData.creativeData.push(item);
          } else if (item.domain === 'Editorial') {
            sortedData.editorialData.push(item);
          } else if (item.domain === 'Publicity') {
            sortedData.publicityData.push(item);
          } else if (item.domain === 'Event') {
            sortedData.eventData.push(item);
          }
        });

        setData(sortedData);
      },
    });
  };

  useEffect(() => {
    // Parse the single CSV file and store data in state
    parseCSV(team_file);
  }, []);

  return (
    <div className="App">
      <AuthContextProvider>
        <NavBar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/events' element={<Events />} />
          <Route exact path='/blogs' element={<Blogs />} />
          <Route exact path='/hackinfinity' element={<Hackinfinity />} />
          {/* Pass each section's data as props to the Team component */}
          <Route
            exact
            path='/team'
            element={
              <Team 
                coreData={data.coreData}
                technicalData={data.technicalData}
                creativeData={data.creativeData}
                editorialData={data.editorialData}
                publicityData={data.publicityData}
                eventData={data.eventData}
              />
            }
          />
          <Route exact path='/zenith' element={<Dashboard />} />
          <Route exact path='/zenith/:domainId' element={<Domain />} />
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
