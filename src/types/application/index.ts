import type { DefaultTheme } from "styled-components";
import type { ViewsType, ViewsUpdateType } from "../views";

export const VIEWS_ADD = 'VIEWS_ADD';
export const VIEWS_UPDATE = 'VIEWS_UPDATE';

export const LOWPERFORMANCE_SET = 'LOWPERFORMANCE_SET';

export const CURRENTTHEME_SET = 'CURRENTTHEME_SET';
export const THEME_ADD = 'THEME_ADD';

export const CURRENTVIEW_SET = 'CURRENTVIEW_SET';
export const CURRENTLANGUAGE_SET = 'CURRENTLANGUAGE_SET';

export const REDUXVISUALIZER_SET = 'REDUXVISUALIZER_SET';
export interface ApplicationState {
    currentView: {name: string; byClick: boolean} | undefined;
    currentLanguage: string;
    currentTheme: DefaultTheme;
    themeList: DefaultTheme[];
    isLowPerformance: boolean;
    views: ViewsType[];
    reduxVisualizer: boolean;
}

export interface ApplicationViewsAction {
    type: typeof VIEWS_ADD;
    payload: ViewsType;
}

export interface ApplicationViewsUpdateAction {
    type: typeof VIEWS_UPDATE;
    payload: ViewsUpdateType;
}

export interface ApplicationLowPerformanceAction {
    type: typeof LOWPERFORMANCE_SET;
    payload: boolean;
}

export interface ApplicationAddThemeAction {
    type: typeof THEME_ADD;
    payload: DefaultTheme;
}

export interface ApplicationThemeAction {
    type: typeof CURRENTTHEME_SET;
    payload: DefaultTheme;
}

export interface ApplicationAction {
    type: typeof CURRENTVIEW_SET;
    payload: {name: string; byClick: boolean};
}

export interface ApplicationLanguageAction {
    type: typeof CURRENTLANGUAGE_SET;
    payload: string;
}

export interface ReduxVisualizerAction {
    type: typeof REDUXVISUALIZER_SET;
    payload: boolean;
}
export type ApplicationTypes = ReduxVisualizerAction | ApplicationAction | ApplicationLanguageAction | ApplicationThemeAction | ApplicationAddThemeAction | ApplicationLowPerformanceAction | ApplicationViewsAction | ApplicationViewsUpdateAction;