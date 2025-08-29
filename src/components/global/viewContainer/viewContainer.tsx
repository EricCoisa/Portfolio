import { connectUtil, type PropsFromRedux } from '../../../utils/reduxUtil';
import { VideoBackground, ViewContainer } from './viewContainer.styles';
import { AddView, SetCurrentView, UpdateView } from '../../../store/application/actions/applicationAction';
import type { RootStateBase } from 'src/store/rootReducer';
import { Fragment, useEffect, useState } from 'react';


const connector = connectUtil(
    (state: RootStateBase) => ({
        currentView: state.ApplicationReducer.currentView,
    }),
    { AddView, SetCurrentView, UpdateView }
);

export interface ViewMaskProps {
    src: string;
    alt?: string;
    position?: string;
    backgroundImage?: string;
    backgroundAttachment?: string;  
    backgroundSize?: string;
    backgroundPosition?: string;
    backgroundRepeat?: string;
    opacity?: string;
}


export type ViewContainerComponentProps = PropsFromRedux<typeof connector> & {
    name: string;
    color: string;
    background: string;
    icon: string;
    children: React.ReactNode;
    mask?: ViewMaskProps;
    style?: React.CSSProperties;
}

function ViewContainerComponent(props: ViewContainerComponentProps) {
    const [currentName, setCurrentName] = useState<string>();
    useEffect(() => {
        if(currentName == null){
            props.AddView({name: props.name, color: props.color, background: props.background, icon: props.icon});
        }else{
            props.UpdateView({name: currentName, newName: props.name});
        }
        setCurrentName(props.name);
    }, [props.name]);

    const isVideo = props.mask?.src?.endsWith('.mp4') || props.mask?.src?.endsWith('.webm');
    return (
        <ViewContainer
            id={props.name}
            $masksrc={isVideo === false ? props.mask : undefined}
            style={props.style}
        >
            {isVideo && props.mask ? (
                <Fragment>
                    <VideoBackground
                        autoPlay
                        loop
                        muted
                        playsInline
                >
                    <source style={{}} src={props.mask.src} type="video/mp4" />
                </VideoBackground>
                    <div style={{ display: 'flex', justifyItems:"center", alignItems: 'center', justifyContent: 'center', zIndex: 1, width: '100%' , height: '100%'}}>
                {props.children}
            </div>
                </Fragment>
            ): <Fragment>{props.children}</Fragment>}

        
        </ViewContainer>
    );
}

const ConnectedViewContainerComponent = connector(ViewContainerComponent);
export default ConnectedViewContainerComponent;