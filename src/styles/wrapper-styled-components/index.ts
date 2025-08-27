
// Single-import, opt-in mixin for theme layer.
// Usage: import styled from 'wrapper-styled-components';
//        styled.div` ${styled.themeLayer} ... `
import styled, { css, type RuleSet } from "styled-components";
import { GetState } from "../../store/store";
import normalTheme from "../../themes/normalTheme";


export const themeLayer = css`
  ${({ theme }) => {
    let themeList;
    try {
      themeList = GetState?.()?.ApplicationReducer?.themeList;
    } catch {
      themeList = normalTheme;
    }
    if (Array.isArray(themeList)) {
      const found = themeList.find(t => t.name === theme.name);
      return found ? found.name : theme.name;
    }
    return theme.name;
  }}
` as RuleSet<object>;

// Default export is the original styled, augmented with a themeLayer helper.
const styledExport = styled as typeof styled & { themeLayer: RuleSet<object> };
(styledExport as { themeLayer: RuleSet<object> }).themeLayer = themeLayer;

export default styledExport;
