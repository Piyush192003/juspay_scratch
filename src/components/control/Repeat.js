import Paper from '@material-ui/core/Paper';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setRepeatEvents } from '../../redux/sprites.slice';

const Repeat = ({ componentId }) => {
  const [repeat, setStateRepeat] = useState(0);

  const dispatch = useDispatch();
  const repeatState = useSelector((state) => state.spriteUseCase.repeat);

  // Set Repeat value for current component
  function handleChange(e) {
    let val = parseInt(e.target.value);
    setStateRepeat(val);
    let curr = repeatState;
    curr = { ...curr, [componentId]: val };
    dispatch(setRepeatEvents(curr));
  }

  return (
    <Paper elevation={3}>
      <div className='rounded text-center bg-red-400 p-2 my-3'>
        <div className='grid grid-cols-2 my-2'>
          <div className='text-white'>Repeat</div>
          <input
            className='mx-2 p-1 py-0 text-center'
            type='number'
            value={repeat}
            onChange={handleChange}
          />
        </div>
        <div
          id={componentId}
          className='text-center bg-red-600 text-white px-2 py-1 my-2 text-sm cursor-pointer'
        >
          Repeat By {repeat}
        </div>
      </div>
    </Paper>
  );
};

export default Repeat;
