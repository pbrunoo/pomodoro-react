
import { TaskContextProvider } from './contexts/TaskContext/TaskContextProvider';
import './styles/theme.css';
import './styles/global.css';
import { MessageContainer } from './components/MessagesContainer';
import { MainRouter } from './Routers/MainRouter';

export function App() {
    return (
        <TaskContextProvider>
            <MessageContainer>
                <MainRouter />
            </MessageContainer>
        </TaskContextProvider>
    );
}