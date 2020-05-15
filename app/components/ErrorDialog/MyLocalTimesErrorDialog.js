import React from 'react';

import {Modal} from 'react-native';

import {Dialog, Button, Paragraph, withTheme} from 'react-native-paper';

class MyLocalTimesErrorDialog extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {message, visible, closeDialog} = this.props;
    return (
      <Modal>
        <Dialog visible={visible} onDismiss={closeDialog}>
          <Dialog.Content>
            <Paragraph>{message}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button theme={this.props.theme} onPress={() => closeDialog(false)}>
              CLOSE
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Modal>
    );
  }
}

export default withTheme(MyLocalTimesErrorDialog);
