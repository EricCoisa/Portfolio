
import type { AppThunk } from "../../../utils/reduxUtil";
import i18n from '../../../i18n';

import { CURRENTVIEW_SET, CURRENTLANGUAGE_SET, CURRENTTHEME_SET, VIEWS_ADD } from "../../../types/application";
import type { DefaultTheme } from "styled-components";
import type { ViewsType } from "../../../types/views";

export function AddView(label: ViewsType): AppThunk {
    return async function dispatchAddHeaderButton(dispatch) {
        dispatch({
            payload: label,
            type: VIEWS_ADD
        });
    };
}

export function SetCurrentTheme(theme: DefaultTheme): AppThunk {
    return async function dispatchSetCurrentTheme(dispatch) {
        dispatch({
            payload: theme,
            type: CURRENTTHEME_SET
        });
    };
}


export function SetCurrentView(currentView: string): AppThunk {
    return async function dispatchSetCurrentView(dispatch) {
        dispatch({
            payload: currentView,
            type: CURRENTVIEW_SET
        });
    };
}

export function SetCurrentLanguage(language: string): AppThunk {
    return async function dispatchSetCurrentLanguage(dispatch) {
        i18n.changeLanguage(language);
        dispatch({
            payload: language,
            type: CURRENTLANGUAGE_SET
        });
    };
}

