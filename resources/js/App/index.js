import loadable from '@loadable/component'
import ReactDOM from 'react-dom';

function LoadingSpinner() {
    return (
        <h1>Hello world</h1>
    )
}

const Root = loadable(() => import('./root'), { fallback: <LoadingSpinner /> });

if (document.getElementById('app-react')) {
    ReactDOM.render(<Root />, document.getElementById('app-react'));
}