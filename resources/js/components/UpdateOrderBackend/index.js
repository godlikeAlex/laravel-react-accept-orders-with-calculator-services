import ReactDOM from 'react-dom';
import loadable from '@loadable/component'

const UpdateOrderBackend = loadable(() => import('./UpdateOrderBackend'));

if (document.getElementById('update-order-form-backend')) {
    const element = document.getElementById('update-order-form-backend');
    const props = Object.assign({}, element.dataset)
    ReactDOM.render(<UpdateOrderBackend {...props} />, document.getElementById('update-order-form-backend'));
}