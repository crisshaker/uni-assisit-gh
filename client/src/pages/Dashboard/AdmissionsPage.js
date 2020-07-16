import React, { useState, useEffect } from 'react';
import requireProfile from '../../components/requireProfile';
import Header from '../../components/Header';
import Nav from './Nav';
import Loading from '../../components/Loading';
import server from '../../apis/server';
import { NavLink } from 'react-router-dom';

function AdmissionsPage() {
  const [admissions, setAdmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAdmissions() {
      try {
        const response = await server.get('/admissions');
        setAdmissions(response.data);
      } finally {
        setLoading(false);
      }
    }

    fetchAdmissions();
  }, []);

  if (loading) return <Loading text="Loading Open Admissions" />;

  return (
    <div id="dashboard">
      <Header />

      <div className="container-1">
        <Nav />
        <ul className="programmes">
          {admissions.map(({ school, title, id }) => (
            <li className="programme" key={id}>
              <NavLink to={`/admissions/${id}`}>
                <p className="title">{`${school} - ${title}`}</p>
                <p className="details">10 Programmes | Closes 08-Aug-2020</p>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default requireProfile(AdmissionsPage);
