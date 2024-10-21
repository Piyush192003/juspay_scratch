import React from 'react';
import Repeat from '../components/control/Repeat';
import Wait from '../components/control/Wait';
import BroadcastMessage from '../components/event/broadcast';
import HideMessage from '../components/look/HideMessage';
import HideSprite from '../components/look/HideSprite';
import SayMessage from '../components/look/SayMessage';
import SayMessageWithTimer from '../components/look/SayMessageWithTimer';
import ShowSprite from '../components/look/ShowSprite';
import SpriteSize from '../components/look/SpriteSize';
import ThinkMessage from '../components/look/ThinkMessage';
import ThinkMessageWithTimer from '../components/look/ThinkMessageWithTimer';
import MoveX from '../components/motion/MoveX';
import MoveXY from '../components/motion/MoveXY';
import MoveY from '../components/motion/MoveY';
import TurnAntiClockWise from '../components/motion/TurnAntiClockwise';
import TurnClockWise from '../components/motion/TurnClockwise';

export const renderSideBarComponentBasedOnType = (componentType, id) => {
  switch (componentType) {
    case 'MOVE_X':
      return <MoveX componentId={id} />;
    case 'MOVE_Y':
      return <MoveY componentId={id} />;
    case 'MOVE_XY':
      return <MoveXY componentId={id} />;
    case 'TURN_CLOCKWISE':
      return <TurnClockWise componentId={id} />;
    case 'TURN_ANTI_CLOCKWISE':
      return <TurnAntiClockWise componentId={id} />;

    case 'WAIT':
      return <Wait componentId={id} />;
    case 'REPEAT':
      return <Repeat componentId={id} />;

    case 'HIDE_SPRITE':
      return <HideSprite componentId={id} />;
    case 'SHOW_SPRITE':
      return <ShowSprite componentId={id} />;
    case 'HIDE_MESSAGE':
      return <HideMessage componentId={id} />;
    case 'SAY_MESSAGE':
      return <SayMessage componentId={id} />;
    case 'SAY_MESSAGE_WITH_TIMER':
      return <SayMessageWithTimer componentId={id} />;
    case 'THINK_MESSAGE':
      return <ThinkMessage componentId={id} />;
    case 'THINK_MESSAGE_WITH_TIMER':
      return <ThinkMessageWithTimer componentId={id} />;
    case 'SPRITE_SIZE':
      return <SpriteSize componentId={id} />;

    case 'BROADCAST':
      return <BroadcastMessage componentId={id} />;

    default:
      return null;
  }
};
