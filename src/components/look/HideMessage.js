import Paper from '@material-ui/core/Paper';
import React from 'react';
import { useSelector } from 'react-redux';

const HideMessage = ({ componentId }) => {
  const state = useSelector((state) => state.spriteUseCase);

  const displayMessage = () => {
    window.clearTimeout();
    const el = document.getElementById(`${state.activeSprite}-message-box`);
    const el2 = document.getElementById(`${state.activeSprite}-think-box1`);
    el.style.display = 'none';
    el2.style.display = 'none';
  };

  return (
    <Paper elevation={3}>
      <div
        id={componentId}
        onClick={displayMessage}
        className='rounded bg-purple-700 text-center text-white max-w-content p-1 my-3'
      >
        Hide Message
      </div>
    </Paper>
  );
};

export default HideMessage;
