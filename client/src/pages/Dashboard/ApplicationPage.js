import React, { useState, useEffect } from 'react';
import requireProfile from '../../components/requireProfile';
import Header from '../../components/Header';
import Loading from '../../components/Loading';
import server from '../../apis/server';

function ApplicationPage({ match, history }) {
  const [loading, setLoading] = useState(true);
  const [programmes, setProgrammes] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [p1, setp1] = useState('');
  const [p2, setp2] = useState('');
  const [p3, setp3] = useState('');

  const id = match.params.id;
  useEffect(() => {
    async function fetchProgrammes() {
      const response = await server.get(`/admissions/${id}/programmes`);

      setProgrammes(response.data);
      setLoading(false);
    }

    fetchProgrammes();
  }, []);

  async function onSubmit(e) {
    e.preventDefault();

    const data = { programmes: [p1, p2, p3] };
    await server.post(`/admissions/${id}/applications`, data);
    history.push('/dashboard/admissions');
  }

  if (loading) return <Loading text="Loading application" />;

  return (
    <div id="application">
      <Header />
      <form className="vcx" onSubmit={onSubmit}>
        <div className="group">
          <label htmlFor="programme_1">First Programme:</label>
          <div className="vcx select">
            <select
              id="programme_1"
              name="programme_1"
              onChange={(e) => setp1(e.target.value)}
            >
              {programmes.map((programme) => (
                <option key={programme.id} value={programme.id}>
                  {programme.title}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="group">
          <label htmlFor="programme_1">Second Programme:</label>
          <div className="vcx select">
            <select
              id="programme_1"
              name="programme_1"
              onChange={(e) => setp2(e.target.value)}
            >
              {programmes.map((programme) => (
                <option key={programme.id} value={programme.id}>
                  {programme.title}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="group">
          <label htmlFor="programme_1">Third Programme:</label>
          <div className="vcx select">
            <select
              id="programme_1"
              name="programme_1"
              onChange={(e) => setp3(e.target.value)}
            >
              {programmes.map((programme) => (
                <option key={programme.id} value={programme.id}>
                  {programme.title}
                </option>
              ))}
            </select>
          </div>
        </div>
        {submitting ? (
          <div className="loading-icon">
            <i className="fas fa-circle-notch"></i>
          </div>
        ) : (
          <button type="submit" className="vcx block green button">
            Apply
            <i className="fas fa-check"></i>
          </button>
        )}
      </form>
      <div style={{ height: 200 }} />
    </div>
  );
}

export default requireProfile(ApplicationPage);
