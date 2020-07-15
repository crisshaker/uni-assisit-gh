import React, { useState, useReducer, useEffect } from 'react';
import Input from './Input';
import server from '../../apis/server';
import history from '../../history';
import Loading from '../../components/Loading';

const initialState = {
  first_name: { value: '', error: '' },
  last_name: { value: '', error: '' },
  pob: { value: '', error: '' },
  phone: { value: '', error: '' },
  id_type: { value: 'voters', error: '' },
  id_num: { value: '', error: '' },
};

const types = {
  CHANGE: 'CHANGE',
  SET_ERROR: 'SET_ERROR',
};

function reducer(state, action) {
  switch (action.type) {
    case types.CHANGE:
      return {
        ...state,
        [action.name]: {
          ...state[action.name],
          value: action.value,
          error: '',
        },
      };
    case types.SET_ERROR:
      return {
        ...state,
        [action.name]: {
          ...state[action.name],
          error: action.error,
        },
      };
    default:
      return state;
  }
}

function ProfileEditPage() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await server.get('/user/profile');
        for (const [name, value] of Object.entries(response.data)) {
          dispatch({ type: types.CHANGE, name, value });
        }
        setLoading(false);
      } catch (err) {}
    }

    fetchProfile();
  }, []);

  function onInputChange(e) {
    const { name, value } = e.target;
    dispatch({ type: types.CHANGE, name, value });
  }

  function setError(name, error) {
    dispatch({ type: types.SET_ERROR, name, error });
  }

  async function onSubmit(e) {
    e.preventDefault();

    const data = {};
    for (const key in state) {
      data[key] = state[key].value;
    }

    setSubmitting(true);
    try {
      await server.post('/user/profile', data);
      window.location = '/dashboard';
    } catch (err) {
      setSubmitting(false);
      const errors = err?.response?.data?.error;
      if (errors) {
        for (const [name, error] of Object.entries(errors)) {
          setError(name, error);
        }

        const firstElement = document.getElementById(Object.keys(errors)[0]);
        firstElement.scrollIntoView({ block: 'center', behavior: 'smooth' });
      }
    }
  }

  if (loading) return <Loading />;

  return (
    <div id="profile-edit">
      <form className="vcx" onSubmit={onSubmit}>
        <h2>
          <i className="fas fa-user"></i>Edit your profile
        </h2>
        <div className="section">
          <div className="group">
            <label htmlFor="first_name">First name:</label>
            <Input
              name="first_name"
              data={state.first_name}
              onChange={onInputChange}
            />
          </div>
          <div className="group">
            <label htmlFor="last_name">Last name:</label>
            <Input
              name="last_name"
              data={state.last_name}
              onChange={onInputChange}
            />
          </div>
        </div>
        <div className="section">
          <div className="group">
            <label htmlFor="pob">Place of birth:</label>
            <Input name="pob" data={state.pob} onChange={onInputChange} />
          </div>
          <div className="group">
            <label htmlFor="phone">Phone number:</label>
            <Input
              name="phone"
              inputMode="tel"
              data={state.phone}
              onChange={onInputChange}
            />
          </div>
        </div>
        <div className="section">
          <div className="group">
            <label htmlFor="id_type">National ID Type:</label>
            <div className="vcx select">
              <select
                id="id_type"
                name="id_type"
                value={state.id_type.value}
                onChange={onInputChange}
              >
                <option value="voters">Voter's ID</option>
                <option value="nhis">NHIS</option>
                <option value="dvla">Driver's License</option>
                <option value="passport">Passport</option>
              </select>
            </div>
          </div>
          <div className="group">
            <label htmlFor="id_num">ID Number:</label>
            <Input name="id_num" data={state.id_num} onChange={onInputChange} />
          </div>
        </div>
        {submitting ? (
          <div className="loading-icon">
            <i className="fas fa-circle-notch"></i>
          </div>
        ) : (
          <button type="submit" className="vcx block green button">
            Save Changes
            <i className="fas fa-check"></i>
          </button>
        )}
      </form>
      <div style={{ height: 200 }} />
    </div>
  );
}

export default ProfileEditPage;
