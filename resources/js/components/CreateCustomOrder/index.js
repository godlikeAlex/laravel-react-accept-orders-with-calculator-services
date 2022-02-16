import loadable from '@loadable/component'
import ReactDOM from 'react-dom';
const CreateCustomOrder = loadable(() => import('./CreateCustomOrder'));

if (document.getElementById('create-custom-order-form-backend')) {
    ReactDOM.render(<CreateCustomOrder />, document.getElementById('create-custom-order-form-backend'));
}
