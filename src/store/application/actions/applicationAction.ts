
import type { AppThunk } from "../../../utils/reduxUtil";
import i18n from '../../../i18n';

import { CURRENTVIEW_SET, CURRENTLANGUAGE_SET, CURRENTTHEME_SET, VIEWS_ADD, VIEWS_UPDATE } from "../../../types/application";
import type { DefaultTheme } from "styled-components";
import type { ViewsType, ViewsUpdateType } from "../../../types/views";

export function AddView(label: ViewsType): AppThunk {
    return async function dispatchAddHeaderButton(dispatch) {
        dispatch({
            payload: label,
            type: VIEWS_ADD
        });
    };
}

export function UpdateView(label: ViewsUpdateType): AppThunk {
    return async function dispatchUpdateView(dispatch) {
        dispatch({
            payload: label,
            type: VIEWS_UPDATE  
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


export function SetCurrentView(name: string, byClick : boolean = false): AppThunk {
    return async function dispatchSetCurrentView(dispatch) {
        dispatch({
            payload: {name, byClick},
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

