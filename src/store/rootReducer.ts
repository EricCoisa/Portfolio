import { combineReducers } from '@reduxjs/toolkit';
import { ApplicationReducer } from './application/reducers/applicationReducer';
import { VisualizerReducer } from 'redux-visualizer';

const rootReducer = combineReducers({
  ApplicationReducer,
});



export default VisualizerReducer(rootReducer);;

export type RootStateBase = ReturnType<typeof rootReducer>
