import { Button, FormControl, MenuItem, Select } from '@material-ui/core';
import { AddCircleOutline } from '@material-ui/icons';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addSprite, setActiveSprite } from '../redux/sprites.slice';
import CatSprite from './CatSprite';

export default function PreviewArea() {
  const dispatch = useDispatch();
  const sprites = useSelector((state) => state.spriteUseCase.sprites);
  const activeSprite = useSelector((state) => state.spriteUseCase.activeSprite);

  const [active, setActive] = useState(activeSprite);
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;

  let elmnt = null;

  function dragMouseDown(e, id) {
    elmnt = document.getElementById(id);

    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:

    elmnt.style.top = elmnt.offsetTop - pos2 + 'px';
    elmnt.style.left = elmnt.offsetLeft - pos1 + 'px';
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }

  // handle changing active character
  const handleChange = (e) => {
    setActive(e.target.value);
    dispatch(setActiveSprite(e.target.value));
  };

  return (
    <div className='flex-none overflow-y-auto p-2 w-full'>
      <div className='flex justify-between mb-10 sticky top-0'>
        <div className='font-bold text-center'>Preview Area</div>
        <div>
          <FormControl>
            <Select
              labelId='demo-simple-select-placeholder-label-label'
              id='demo-simple-select-placeholder-label'
              value={active}
              onChange={(e) => handleChange(e)}
              displayEmpty
            >
              {sprites?.map((x, i) => {
                const name = x.id.charAt(0).toUpperCase() + x.id.substr(1);

                return (
                  <MenuItem key={i} value={x.id}>
                    {name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>

        <div>
          <Button
            variant='outlined'
            color='secondary'
            startIcon={<AddCircleOutline />}
            onClick={() => {
              dispatch(addSprite());
            }}
          >
            New
          </Button>
        </div>
      </div>

      <div className='flex justify-around h-full'>
        {sprites?.map((x, i) => {
          return (
            <div
              id={`${x.id}-${i}`}
              key={i}
              className={`absolute`}
              onMouseDown={(e) => dragMouseDown(e, `${x.id}-${i}`)}
            >
              <div id={`${x.id}-div`} className='catAnimation'>
                <div
                  className='hidden border-2 p-2 ml-3 mb-2 w-auto whitespace-nowrap'
                  id={x.id + '-message-box'}
                ></div>
                <div
                  className='hidden rounded-full border-2 w-4 left-1/2 h-4 ml-3 mb-2 whitespace-nowrap'
                  id={x.id + '-think-box1'}
                ></div>
                <CatSprite spriteId={x.id} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

