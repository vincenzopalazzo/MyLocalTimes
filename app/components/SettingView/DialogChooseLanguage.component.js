import React, {Component} from 'react';
import {Modal, ScrollView, View} from 'react-native';

import {withTheme, Dialog, RadioButton, Text, Button} from 'react-native-paper';
import LanguageProvider from '../../utils/LanguageProvider';

import Theme from '../../Theme.style';

class DialogChooseLanguageComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {visible, onDismiss} = this.props;
    return (
      <Modal transparent={true} visible={visible}>
        <Dialog
          theme={Theme.lite}
          visible={visible}
          onDismiss={() => onDismiss()}>
          <Dialog.Content>
            <RadioButton.Group
              theme={Theme.lite}
              onValueChange={value => console.debug(`new value ${value}`)}
              value={LanguageProvider.getInstance().getCurrentLanguage()}>
              {LanguageProvider.getInstance()
                .getLanguageSupport()
                .map(item => (
                  <View>
                    <Text theme={Theme.lite}>{item}</Text>
                    <RadioButton theme={Theme.lite} value={item} />
                  </View>
                ))}
            </RadioButton.Group>
          </Dialog.Content>
          <Dialog.Actions>
            <Button theme={Theme.lite} onPress={() => onDismiss()}>Cancel</Button>
            <Button theme={Theme.lite} enable={false} onPress={() => console.log("Ok")}>Ok</Button>
          </Dialog.Actions>
        </Dialog>
      </Modal>
    );
  }
}

export default withTheme(DialogChooseLanguageComponent);
