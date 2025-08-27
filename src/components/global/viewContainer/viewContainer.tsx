import { connectUtil, type PropsFromRedux } from '../../../utils/reduxUtil';
import { ViewContainer } from './viewContainer.styles';
import { AddView, SetCurrentView } from '../../../store/application/actions/applicationAction';
import type { RootStateBase } from 'src/store/rootReducer';
import { useEffect } from 'react';


const connector = connectUtil(
    (state: RootStateBase) => ({
        currentView: state.ApplicationReducer.currentView,
    }),
    { AddView, SetCurrentView }
);

export type ViewContainerComponentProps = PropsFromRedux<typeof connector> & {
    name: string;
    color: string;
    background: string;
    children: React.ReactNode;
}

function ViewContainerComponent(props: ViewContainerComponentProps) {
    useEffect(() => {
        props.AddView({name: props.name, color: props.color, background: props.background});
    }, []);

    useEffect(() => {
        function handleScroll() {
            const el = document.getElementById(props.name);
            if (!el) return;
            const rect = el.getBoundingClientRect();
            const inView = rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2;
            if (inView) {
                props.SetCurrentView(props.name);
            }
        }
        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [props.name, props.SetCurrentView]);

    return (
        <ViewContainer id={props.name}>
            {props.children}
        </ViewContainer>
    );
}

const ConnectedViewContainerComponent = connector(ViewContainerComponent);
export default ConnectedViewContainerComponent;
