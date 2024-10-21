import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const MoveX = ({ componentId }) => {
  const activeSprite = useSelector((state) => state.spriteUseCase.activeSprite);

  const [steps, setSteps] = useState(0);

  const handleClick = () => {
    const el = document.getElementById(`${activeSprite}-div`);

    var left = el.offsetLeft;
    el.style.position = 'relative';
    el.style.left = left + steps + 'px';
  };

  return (
    <div>
      <div
        id={componentId}
        className={`text-center rounded bg-blue-400 text-white p-2 my-2 text-sm cursor-pointer mx-auto`}
        onClick={handleClick}
      >
        Move X{' '}
        <input
          type='number'
          className='text-black text-center w-16 mx-2'
          value={steps}
          onChange={(e) => setSteps(parseInt(e.target.value))}
        />{' '}
        steps
      </div>
    </div>
  );
};

export default MoveX;
