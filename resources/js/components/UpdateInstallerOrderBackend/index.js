import ReactDOM from 'react-dom';
import loadable from '@loadable/component'
import SimpleReactLightbox from 'simple-react-lightbox';

const UpdateInstallerOrderBackend = loadable(() => import('./UpdateInstallerOrderBackend'));

if (document.getElementById('update-installer-order-form-backend')) {
    const element = document.getElementById('update-installer-order-form-backend');
    const props = Object.assign({}, element.dataset)
    ReactDOM.render(<SimpleReactLightbox><UpdateInstallerOrderBackend {...props} /></SimpleReactLightbox>, document.getElementById('update-installer-order-form-backend'));
}