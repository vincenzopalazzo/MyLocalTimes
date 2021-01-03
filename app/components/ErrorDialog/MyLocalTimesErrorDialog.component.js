import React from 'react';
import {Modal, View} from 'react-native';
import {Dialog, Button, Paragraph, Portal, withTheme} from 'react-native-paper';
import LanguageProvider from '../../utils/LanguageProvider';
import Constant from '../../utils/Constant';

const LOG_TAG = `${new Date().toISOString()} MyLocalTimesErrorDialog.js`;

class MyLocalTimesErrorDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonMessage: LanguageProvider.getInstance().getTranslate(
        Constant.language.CARD_VIEW_BANNER_CLOSE,
      ),
    };
  }

  render() {
    let {visible, closeDialog, message} = this.props;
    console.debug(LOG_TAG, `Is visible: ${visible}`);
    console.debug(LOG_TAG, `With message: ${message}`);
    return (
      <Portal>
        <Dialog
          theme={this.props.theme}
          visible={visible}
          onDismiss={closeDialog}>
          <Dialog.Content theme={this.props.theme}>
            <Paragraph>{message}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions theme={this.props.theme}>
            <Button color={'#2780E3'} onPress={() => closeDialog(false)}>
              {this.state.buttonMessage}
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    );
  }
}

export default withTheme(MyLocalTimesErrorDialog);
