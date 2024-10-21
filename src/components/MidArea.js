import { Button, Paper } from '@material-ui/core';
import { AddCircleOutline, PlayArrowOutlined } from '@material-ui/icons';
import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { renderSideBarComponentBasedOnType } from '../helpers/index.helper';
import { addANewBlock } from '../redux/sprites.slice';

export default function MidArea() {
  const dispatch = useDispatch();

  const blocksList = useSelector((state) => state.spriteUseCase.midAreaBlocks);
  const waitList = useSelector((state) => state.spriteUseCase.wait);
  const repeatList = useSelector((state) => state.spriteUseCase.repeat);

  const addANewRunnableBlockContainer = () => {
    dispatch(addANewBlock());
  };

  const fireEvent = (element, eventType) => {
    if (element && element.fireEvent) {
      element.fireEvent('on' + eventType);
    } else if (element) {
      var evObj = document.createEvent('Events');
      evObj.initEvent(eventType, true, false);
      element.dispatchEvent(evObj);
    }
  };

  // Handle Running the list
  const handleBlockRun = (arr, id) => {
    if (arr.length === 0) return;
    let i = 0;

    let repeat = 1;

    let str1 = `element${arr[i]}-${id}-${i}`;

    // if first inde is WAIT
    if (arr[i] === 'WAIT') {
      let str2 = `element${arr[i]}-${id}-${i}`;
      let last_time = new Date().getTime();
      let curr_time = new Date().getTime();

      while ((curr_time - last_time) / 1000 < waitList[str2] - 2) {
        curr_time = new Date().getTime();
      }
    }
    // if first index is repeat
    else if (arr[i] === 'REPEAT') {
      repeat = repeatList[str1] + 1;
    } else {
      fireEvent(document.getElementById(str1), 'click');
    }

    i++;

    /* Each function execution takes 2 seconds */
    var cnt = setInterval(() => {
      if (i === arr.length) {
        clearInterval(cnt);
      }

      // Handle Wait
      if (arr[i] === 'WAIT') {
        let str2 = `element${arr[i]}-${id}-${i}`;
        let last_time = new Date().getTime();
        let curr_time = new Date().getTime();

        while ((curr_time - last_time) / 1000 < waitList[str2] - 2) {
          curr_time = new Date().getTime();
        }
        i++;
      }
      // Handle Repeat element at current index
      else if (arr[i] === 'REPEAT') {
        let str2 = `element${arr[i]}-${id}-${i}`;
        repeat = repeat * (repeatList[str2] + 1);
        i++;
      }
      // If Repeat element is at previous index
      else if (arr[i - 1] === 'REPEAT' && repeat > 2) {
        let str2 = `element${arr[i]}-${id}-${i}`;
        fireEvent(document.getElementById(str2), 'click');
        repeat--;
      } else {
        let str2 = `element${arr[i]}-${id}-${i}`;
        fireEvent(document.getElementById(str2), 'click');
        i++;
      }
    }, 2000);
    // }
  };

  return (
    <div className='flex-1 h-full overflow-auto p-5'>
      <div className='flex justify-between'>
        <div className='font-bold text-center'>Mid Area</div>

        <div>
          <Button
            variant='outlined'
            color='primary'
            startIcon={<AddCircleOutline />}
            onClick={addANewRunnableBlockContainer}
          >
            New Block
          </Button>
        </div>
      </div>

      {/* Mid area blocks */}
      <div className='flex flex-wrap gap-2.5'>
        {blocksList?.map((block) => {
          return (
            <div className='w-60' key={block.id}>
              <Paper elevation={3} className='p-4'>
                <div className='w-52 border border-2 border-gray-300 p-2'>
                  <Droppable droppableId={block.id} type='COMPONENTS'>
                    {(provided) => {
                      return (
                        <ul
                          className={`${block.id} w-48 h-full`}
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                        >
                          <div className='text-center mx-auto my-2 mb-4'>
                            <Button
                              variant='contained'
                              startIcon={<PlayArrowOutlined />}
                              onClick={() =>
                                handleBlockRun(block.elements, block.id)
                              }
                            >
                              Run
                            </Button>
                          </div>

                          {block.elements &&
                            block.elements.map((x, i) => {
                              let str = `${x}`;
                              let componentId = `element${str}-${block.id}-${i}`;

                              return (
                                <Draggable
                                  key={`${str}-${block.id}-${i}`}
                                  draggableId={`${str}-${block.id}-${i}`}
                                  index={i}
                                >
                                  {(provided) => (
                                    <li
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                    >
                                      {renderSideBarComponentBasedOnType(
                                        str,
                                        componentId
                                      )}
                                      {provided.placeholder}
                                    </li>
                                  )}
                                </Draggable>
                              );
                            })}
                          {provided.placeholder}
                        </ul>
                      );
                    }}
                  </Droppable>
                </div>
              </Paper>
            </div>
          );
        })}
      </div>
    </div>
  );
}

