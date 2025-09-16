import React, { useEffect, useState } from 'react';

const API_URL = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;


function Activities() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    console.log('Fetching activities from:', API_URL);
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setActivities(results);
        console.log('Fetched activities:', results);
      });
  }, []);

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title mb-4">Activities</h2>
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead className="table-dark">
                <tr>
                  <th>User</th>
                  <th>Team</th>
                  <th>Type</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((activity, idx) => (
                  <tr key={idx}>
                    <td>{activity.user}</td>
                    <td>{activity.team}</td>
                    <td>{activity.type}</td>
                    <td>{activity.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Activities;
