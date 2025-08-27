import type { DefaultTheme } from "styled-components";
import type { ViewsType } from "../views";

export const VIEWS_ADD = 'HEADERBUTTON_ADD';

export const LOWPERFORMANCE_SET = 'LOWPERFORMANCE_SET';

export const CURRENTTHEME_SET = 'CURRENTTHEME_SET';
export const THEME_ADD = 'THEME_ADD';

export const CURRENTVIEW_SET = 'CURRENTVIEW_SET';
export const CURRENTLANGUAGE_SET = 'CURRENTLANGUAGE_SET';

export interface ApplicationState {
    currentView: string | undefined;
    currentLanguage: string;
    currentTheme: DefaultTheme;
    themeList: DefaultTheme[];
    isLowPerformance: boolean;
    views: ViewsType[];
}

export interface ApplicationViewsAction {
    type: typeof VIEWS_ADD;
    payload: ViewsType;
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
    payload: string;
}

export interface ApplicationLanguageAction {
    type: typeof CURRENTLANGUAGE_SET;
    payload: string;
}

export type ApplicationTypes = ApplicationAction | ApplicationLanguageAction | ApplicationThemeAction | ApplicationAddThemeAction | ApplicationLowPerformanceAction | ApplicationViewsAction;