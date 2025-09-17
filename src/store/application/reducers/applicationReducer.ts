
import liquidGlassTheme from '../../../themes/liquidGlassTheme';
import normalTheme from '../../../themes/normalTheme';
import { THEME_ADD, CURRENTLANGUAGE_SET, CURRENTTHEME_SET, CURRENTVIEW_SET, LOWPERFORMANCE_SET, type ApplicationState, type ApplicationTypes, VIEWS_ADD, VIEWS_UPDATE, REDUXVISUALIZER_SET } from '../../../types/application';

const INITIAL_STATE: ApplicationState = {
    currentView: undefined,
    currentLanguage: 'pt',
    currentTheme: normalTheme,

    themeList: [normalTheme, liquidGlassTheme],

    isLowPerformance: false,

    views: [],

    reduxVisualizer: false
}

export function ApplicationReducer(state = INITIAL_STATE, action: ApplicationTypes): ApplicationState {
    switch (action.type) {
        case VIEWS_ADD:
            // Evita adicionar duplicados (assume que action.payload tem uma propriedade 'id' única)
            if (state.views.some(view => view.name === action.payload.name)) {
                return state;
            }
            return { ...state, views: [...state.views, action.payload] };
        case VIEWS_UPDATE:
            return {
                ...state,
                views: state.views.map(view =>
                    view.name === action.payload.name ? { ...view, name: action.payload.newName } : view
                )
            };
        case LOWPERFORMANCE_SET:
            return { ...state, isLowPerformance: action.payload };
        case CURRENTVIEW_SET:
            return { ...state, currentView: action.payload };
        case CURRENTLANGUAGE_SET:
            return { ...state, currentLanguage: action.payload };
        case CURRENTTHEME_SET:
            return { ...state, currentTheme: action.payload };
        case THEME_ADD:
            return { ...state, themeList: [...state.themeList, action.payload] };
        case REDUXVISUALIZER_SET:
            return { ...state, reduxVisualizer: action.payload };
        default:
            return state;
    }
}