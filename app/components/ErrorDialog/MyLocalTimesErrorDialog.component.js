import React from 'react';
import Modal from 'react-native';
import {Dialog, Button, Paragraph, withTheme} from 'react-native-paper';
import LanguageProvider from '../../utils/LanguageProvider';
import Constant from '../../utils/Constant';

const LOG_TAG = `${new Date().toISOString()} MyLocalTimesErrorDialog.js`;

class MyLocalTimesErrorDialog extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {visible, closeDialog, message} = this.props;
    console.debug(LOG_TAG, `Is visible: ${visible}`);
    console.debug(LOG_TAG, `With message> ${message}`);
    return (
      <Modal>
        <Dialog
          theme={this.props.theme}
          visible={visible}
          onDismiss={closeDialog}>
          <Dialog.Content theme={this.props.theme}>
            <Paragraph>{message}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions theme={this.props.theme}>
            <Button color={'#2780E3'} onPress={() => closeDialog(false)}>
              {LanguageProvider.getInstance().getTranslate(
                Constant.language.CARD_VIEW_BANNER_CLOSE,
              )}
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Modal>
    );
  }
}

export default withTheme(MyLocalTimesErrorDialog);
