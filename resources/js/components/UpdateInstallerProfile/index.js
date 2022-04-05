import ReactDOM from 'react-dom';
import UpdateInstallerProfile from './UpdateInstallerProfile';


if (document.getElementById('update-installer-profile')) {
    const element = document.getElementById('update-installer-profile');
    const props = Object.assign({}, element.dataset)
    ReactDOM.render(<UpdateInstallerProfile {...props} />, document.getElementById('update-installer-profile'));
}