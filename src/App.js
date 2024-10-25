import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const initialFormData = {
    full_name: '',
    date_of_birth: '',
    happiness: '',
    energy: '',
    hopefulness: '',
    sleep_hours: ''
  };

  const [formData, setFormData] = useState(initialFormData);
  const [statistics, setStatistics] = useState(null);
  const [individualStats, setIndividualStats] = useState(null);
  const [ageGroupStatistics, setAgeGroupStatistics] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    axios.post('http://localhost:5000/submit', formData)
      .then(response => {
        alert('Submission successful');
        fetchStatistics();
        fetchIndividualStatistics();
        fetchAgeGroupStatistics();
        setFormData(initialFormData); // Clear the form after submission
        setIsSubmitting(false);
      })
      .catch(error => {
        console.error('There was an error submitting the form!', error);
        setIsSubmitting(false);
      });
  };

  const fetchStatistics = () => {
    axios.get('http://localhost:5000/statistics')
      .then(response => {
        setStatistics(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the statistics!', error);
      });
  };

  const fetchIndividualStatistics = () => {
    axios.post('http://localhost:5000/individual-statistics', {
      full_name: formData.full_name,
      date_of_birth: formData.date_of_birth
    })
      .then(response => {
        setIndividualStats(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the individual statistics!', error);
      });
  };

  const fetchAgeGroupStatistics = () => {
    axios.get('http://localhost:5000/age-group-statistics')
      .then(response => {
        setAgeGroupStatistics(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the age group statistics!', error);
      });
  };

  useEffect(() => {
    // Initial fetch for statistics if needed
    fetchStatistics();
    fetchAgeGroupStatistics();
  }, []);

  return (
    <div className="App">
      <h1>Mental Health Questionnaire</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Enter your full name:
          <input type="text" name="full_name" value={formData.full_name} onChange={handleChange} required />
        </label>
        <label>
          Enter your date of birth (mm/dd/yyyy):
          <input type="date" name="date_of_birth" value={formData.date_of_birth} onChange={handleChange} required />
        </label>
        <label>
          On a scale from 1-5, how happy do you feel?
          <input type="number" name="happiness" value={formData.happiness} onChange={handleChange} min="1" max="5" required />
        </label>
        <label>
          On a scale from 1-5, how energetic do you feel?
          <input type="number" name="energy" value={formData.energy} onChange={handleChange} min="1" max="5" required />
        </label>
        <label>
          On a scale from 1-5, how hopeful do you feel about the future?
          <input type="number" name="hopefulness" value={formData.hopefulness} onChange={handleChange} min="1" max="5" required />
        </label>
        <label>
          How many hours have you slept last night?
          <input type="number" name="sleep_hours" value={formData.sleep_hours} onChange={handleChange} required />
        </label>
        <button type="submit" disabled={isSubmitting}>Submit</button>
      </form>

      {statistics && (
        <div className="statistics">
          <h2>Statistics by Age Year</h2>
          <table>
            <thead>
              <tr>
                <th>Date of Birth</th>
                <th>Average Happiness</th>
                <th>Average Energy</th>
                <th>Average Hopefulness</th>
                <th>Average Sleep Hours</th>
              </tr>
            </thead>
            <tbody>
              {statistics.map((stat, index) => (
                <tr key={index}>
                  <td>{stat.date_of_birth}</td>
                  <td>{stat.avg_happiness}</td>
                  <td>{stat.avg_energy}</td>
                  <td>{stat.avg_hopefulness}</td>
                  <td>{stat.avg_sleep_hours}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {individualStats && (
        <div className="individual-statistics">
          <h2>Individual Statistics</h2>
          <table>
            <thead>
              <tr>
                <th>Average Happiness</th>
                <th>Average Energy</th>
                <th>Average Hopefulness</th>
                <th>Average Sleep Hours</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{individualStats.avg_happiness}</td>
                <td>{individualStats.avg_energy}</td>
                <td>{individualStats.avg_hopefulness}</td>
                <td>{individualStats.avg_sleep_hours}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {ageGroupStatistics && (
        <div className="age-group-statistics">
          <h2>Statistics by Age Group</h2>
          <table>
            <thead>
              <tr>
                <th>Age Group</th>
                <th>Average Happiness</th>
                <th>Average Energy</th>
                <th>Average Hopefulness</th>
                <th>Average Sleep Hours</th>
              </tr>
            </thead>
            <tbody>
              {ageGroupStatistics.map((stat, index) => (
                <tr key={index}>
                  <td>{stat.age_group}</td>
                  <td>{stat.avg_happiness}</td>
                  <td>{stat.avg_energy}</td>
                  <td>{stat.avg_hopefulness}</td>
                  <td>{stat.avg_sleep_hours}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;
