import loadable from '@loadable/component'
import ReactDOM from 'react-dom';
const CreateOrderBackend = loadable(() => import('./CreateOrderBackend'));

if (document.getElementById('create-order-form-backend')) {
    ReactDOM.render(<CreateOrderBackend />, document.getElementById('create-order-form-backend'));
}