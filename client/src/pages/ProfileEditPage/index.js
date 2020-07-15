import React from 'react';

function ProfileEditPage() {
  return (
    <div id="profile-edit">
      <form className="vcx">
        <h2>
          <i className="fas fa-user"></i>Edit your profile
        </h2>
        <div className="section">
          <div className="group">
            <label htmlFor="first_name">First name:</label>
            <input className="vcx" type="text" id="first_name" />
          </div>
          <div className="group">
            <label htmlFor="last_name">Last name:</label>
            <input className="vcx" type="text" id="last_name" />
          </div>
        </div>
        <div className="section">
          <div className="group">
            <label htmlFor="pob">Place of birth:</label>
            <input className="vcx" type="text" id="pob" />
          </div>
          <div className="group">
            <label htmlFor="phone">Phone number:</label>
            <input className="vcx" type="text" id="phone" inputMode="tel" />
          </div>
        </div>
        <div className="section">
          <div className="group">
            <label htmlFor="id_type">National ID Type:</label>
            <div className="vcx select">
              <select id="id_type">
                <option>Voter's ID</option>
                <option>NHIS</option>
                <option>Driver's License</option>
                <option>Passport</option>
              </select>
            </div>
          </div>
          <div className="group">
            <label htmlFor="id_number">ID Number:</label>
            <input className="vcx" type="text" id="id_number" />
          </div>
        </div>
        <button type="submit" className="vcx block green button">
          Save Changes
          <i className="fas fa-check"></i>
        </button>
      </form>
      <div style={{ height: 200 }} />
    </div>
  );
}

export default ProfileEditPage;
