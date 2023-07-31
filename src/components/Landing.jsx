import React from 'react';

function Landing({
  landingHeading,
  landingChild
}) {
  return (
    <div className="landing landing_mediaScreen">
      <h2 className="landing__heading">{landingHeading}</h2>
      <span className='landing__line'></span>
      {landingChild}
    </div>
  )
}

export default Landing;