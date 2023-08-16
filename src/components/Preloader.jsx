// --- база
import React from 'react';

function Preloader({ loading }) {
  return (
    <section className={loading ? 'preloader preloader_active' : 'preloader'}>
      <span
        className='preloader__objects'>
      </span>
      <span
        className='preloader__objects preloader__objects_figure1'>
      </span>
      <span
        className='preloader__objects preloader__objects_figure2'>
      </span>
      <span
        className='preloader__objects preloader__objects_figure3'>
      </span>
    </section>
  )
}

export default Preloader;