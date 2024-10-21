import Paper from '@material-ui/core/Paper';
import React from 'react';
import { useSelector } from 'react-redux';

const ShowSprite = ({ componentId }) => {
  const state = useSelector((state) => state.spriteUseCase);

  const handleDisplay = () => {
    const el = document.getElementById(state.activeSprite);
    el.style.display = 'inline-block';
  };

  return (
    <Paper elevation={3}>
      <div
        id={componentId}
        className='rounded text-center bg-purple-700 text-white px-2 py-1 my-2 text-sm cursor-pointer mx-auto'
        onClick={handleDisplay}
      >
        Show Sprite
      </div>
    </Paper>
  );
};

export default ShowSprite;
