// --- база
import React from "react";
import { useNavigate } from "react-router-dom";


function NotFoundPage({disabled}) {
  const navigate = useNavigate();
  return (
    <section className='notFoundPage notFoundPage_mediaScreen'>
      <div className='notFoundPage__box'>
        <h2 className='notFoundPage__heading'>404</h2>
        <p className='notFoundPage__paragraph'>Страница не найдена</p>
      </div>
      <button disabled={disabled} type='button' className='notFoundPage__back-btn' onClick={() => navigate(-1)}>Назад</button>
    </section>
  )
}

export default NotFoundPage;