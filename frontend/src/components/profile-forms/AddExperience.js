import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { addExperience } from '../../actions/profile';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const AddExperience = ({ addExperience, history }) => {
  const [formData, setFormData] = useState({
    company: '',
    title: '',
    location: '',
    from: '',
    to: '',
    current: false,
    description: '',
  });
  const [toDateDisabled, toggleDisabled] = useState(false);
  const { company, title, location, from, to, current, description } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Fragment>
      <div>
        <h1 className="large text-primary">Add An Experience</h1>
        <p className="lead">
          <i className="fas fa-code-branch" /> Add any developer/programming
          positions that you have had in the past
        </p>
        <small>* = required field</small>
        <form
          className="form"
          onSubmit={(e) => {
            e.preventDefault();
            addExperience(formData, history);
          }}
        >
          <div className="form-group">
            <input
              type="text"
              placeholder="* Job Title"
              name="title"
              onChange={(e) => onChange(e)}
              value={title}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="* Company"
              name="company"
              onChange={(e) => onChange(e)}
              value={company}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Location"
              onChange={(e) => onChange(e)}
              value={location}
              name="location"
            />
          </div>
          <div className="form-group">
            <h4>From Date</h4>
            <input
              type="date"
              name="from"
              onChange={(e) => onChange(e)}
              value={from}
            />
          </div>
          <div className="form-group">
            <p>
              <input
                type="checkbox"
                name="current"
                checked={current}
                defaultValue
                onChange={(e) => {
                  setFormData({ ...formData, current: !current });
                  toggleDisabled(!toDateDisabled);
                }}
              />{' '}
              Current Job
            </p>
          </div>
          <div className="form-group">
            <h4>To Date</h4>
            <input
              type="date"
              name="to"
              onChange={(e) => onChange(e)}
              value={to}
              disabled={toDateDisabled ? 'disabled' : ''}
            />
          </div>
          <div className="form-group">
            <textarea
              name="description"
              cols={30}
              rows={5}
              placeholder="Job Description"
              onChange={(e) => onChange(e)}
              value={description}
            />
          </div>
          <input type="submit" className="btn btn-primary my-1" />
          <Link className="btn btn-light my-1" to="/dashboard">
            Go Back
          </Link>
        </form>
      </div>
    </Fragment>
  );
};

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
};

export default connect(null, { addExperience })(withRouter(AddExperience));
