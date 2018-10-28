import React, { Component } from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { Pincode } from './Pincode';
import { Appbar } from 'react-native-paper';

@observer
export class NewPincode extends Component {
  @observable
  isSetMode = true;

  @observable
  pincode = '';

  @observable
  status = 'initial';

  @observable
  disabled = false;

  setPincode(v) {
    this.pincode = v;
    this.disabled = true;

    setTimeout(() => {
      this.isSetMode = false;
    }, 500);
  }

  confirmPincode(v) {
    if (this.pincode === v) {
      this.props.onEnter && this.props.onEnter(v);
    } else {
      this.changeStatus('failure');
    }
  }

  changeStatus(status) {
    this.status = status;
  }

  render() {
    const { isSetMode } = this;
    const { backAction = () => null } = this.props;

    const title = isSetMode ? 'Set Password' : 'Confirm Password';

    return (
      <React.Fragment>
        <Appbar.Header style={{ backgroundColor: 'transparent' }} dark>
          <Appbar.BackAction onPress={backAction} />
          <Appbar.Content title={title} />
        </Appbar.Header>

        {isSetMode ? (
          <Pincode
            key="set"
            description="Set password to secure your account."
            disabled={this.disabled}
            onEnter={v => this.setPincode(v)}
          />
        ) : (
          <Pincode
            key="confirm"
            description="Please re-enter your password."
            status={this.status}
            onChange={() => this.changeStatus('initial')}
            onEnter={v => this.confirmPincode(v)}
          />
        )}
      </React.Fragment>
    );
  }
}
