import React from 'react';

import {Modal} from 'react-native';

import {Dialog, Button, Paragraph, withTheme} from 'react-native-paper';

import LanguageProvider from '../../utils/LanguageProvider';
import Constant from '../../utils/Constant';

class MyLocalTimesErrorDialog extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {message, visible, closeDialog} = this.props;
    return (
      <Modal transparent={true}>
        <Dialog theme={this.props.theme} visible={visible} onDismiss={closeDialog}>
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
