import React, { Fragment } from 'react';
import spinner from './spinner.gif';

const Spinner = () => (
  <Fragment>
    <div
      style={{
        margin: 'auto',
        display: 'flex',
        height: '83%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <img src={spinner} style={{ width: '50px' }} alt="Loading..." />
    </div>
  </Fragment>
);

export default Spinner;
