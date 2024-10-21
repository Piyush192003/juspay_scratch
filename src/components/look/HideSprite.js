import Paper from '@material-ui/core/Paper';
import React from 'react';
import { useSelector } from 'react-redux';

const HideSprite = ({ componentId }) => {
  const state = useSelector((state) => state.spriteUseCase);

  const handleHideDisplay = () => {
    const el = document.getElementById(state.activeSprite);
    el.style.display = 'none';
  };

  return (
    <Paper elevation={3}>
      <div
        id={componentId}
        className='text-center rounded bg-purple-700 text-white px-2 py-1 my-2 text-sm cursor-pointer mx-auto'
        onClick={handleHideDisplay}
      >
        Hide Sprite
      </div>
    </Paper>
  );
};

export default HideSprite;
