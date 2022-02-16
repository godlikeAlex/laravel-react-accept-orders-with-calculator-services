import ReactDOM from 'react-dom';
import loadable from '@loadable/component'

const CustomOrderBackend = loadable(() => import('./UpdateCustomOrderBackend'));

if (document.getElementById('update-custom-order-form-backend')) {
    const element = document.getElementById('update-custom-order-form-backend');
    const props = Object.assign({}, element.dataset)
    ReactDOM.render(<CustomOrderBackend {...props} />, document.getElementById('update-custom-order-form-backend'));
}