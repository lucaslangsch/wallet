import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

class Wallet extends React.Component {
  render() {
    const { email } = this.props;
    return (
      <div>
        TrybeWallet
        { email }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.user,
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Wallet);
