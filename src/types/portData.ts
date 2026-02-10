export interface PresentationCompany {
    name: string;
    urlData: string;
}

export interface ProjectItem {
    name: string;
    urlData: string;
}

export interface PortData {
    language:{
        urlPt: string;
        urlEn: string;
    },
    curriculum:{
        urlPt: string;
        urlEn: string;
    },
    presentation?: PresentationCompany[];
    projects?: ProjectItem[];
}