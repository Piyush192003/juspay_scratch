import Paper from '@material-ui/core/Paper';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

// Move Component for Sidebar
const MoveY = ({ componentId }) => {
  const activeSprite = useSelector((state) => state.spriteUseCase.activeSprite);
  const [steps, setSteps] = useState(0);

  const handleClick = () => {
    const el = document.getElementById(`${activeSprite}-div`);
    var top = el.offsetTop;
    el.style.position = 'relative';
    el.style.top = top + steps + 'px';
  };

  return (
    <Paper elevation={3}>
      <div
        id={componentId}
        className={`text-center rounded bg-blue-400 text-white p-2 my-2 text-sm cursor-pointer mx-auto`}
        onClick={handleClick}
      >
        Move Y{' '}
        <input
          type='number'
          className='text-black text-center w-16 mx-2'
          value={steps}
          onChange={(e) => setSteps(parseInt(e.target.value))}
        />{' '}
        steps
      </div>
    </Paper>
  );
};

export default MoveY;
