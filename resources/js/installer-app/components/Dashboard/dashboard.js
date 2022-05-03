import React, {useState} from 'react';
import {
  Container,
  Icon,
  Menu,
  Sidebar,
  Segment,
  Header,
  Image,
  Grid
} from 'semantic-ui-react'

const Dashboard = () => {
  const [sideBarVisible, setSideBarVisible] = useState(true);

  const onToggleSideBar = () => setSideBarVisible(isVisible => !isVisible);

  return (
    <Sidebar.Pushable as={'div'}>
      <Sidebar
        as={Menu}
        animation='push'
        icon='labeled'
        inverted
        onHide={() => setSideBarVisible(false)}
        vertical
        visible={sideBarVisible}
        width='thin'
      >
        <Menu.Item as='a'>
          <Icon name='home' />
          Completed Orders
        </Menu.Item>
        <Menu.Item as='a'>
          <Icon name='gamepad' />
          List of orders
        </Menu.Item>
      </Sidebar>

      <Sidebar.Pusher>
        <Menu inverted style={{borderRadius: '0px'}}>
          <Menu.Item as='a' onClick={onToggleSideBar}>
            <Icon name='sidebar' />
          </Menu.Item>
          <Menu.Item as='a' header>
            EasyWayInstall
          </Menu.Item>
        </Menu>

        <div className={sideBarVisible ? 'content-installer  small-content-installer' : 'content-installer big-content-installer'}>
          <Container fluid>
            <Segment>
              <h1>Hello world</h1>
            </Segment>
          </Container>
        </div>
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  )
}

const SidebarRight = ({visible, hide}) => (
  <Sidebar
    as={Menu}
    animation='overlay'
    icon='labeled'
    inverted
    onHide={hide}
    vertical
    visible={visible}
    width='thin'
  >
    <div style={{height: '40px'}}>
      <Icon name='angle left' style={{color: 'white'}} />
    </div>
    <Menu.Item as='a'>
      <Icon name='home' />
      Home
    </Menu.Item>
    <Menu.Item as='a'>
      <Icon name='gamepad' />
      Games
    </Menu.Item>
    <Menu.Item as='a'>
      <Icon name='camera' />
      Channels
    </Menu.Item>
  </Sidebar>
)

export default Dashboard;