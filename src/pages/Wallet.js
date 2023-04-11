import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
// import { PropTypes } from 'prop-types';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
      </div>
    );
  }
}

// const mapStateToProps = (state) => ({
//   ...state.user,
// });

// Wallet.propTypes = {
//   email: PropTypes.string.isRequired,
// };

export default connect()(Wallet);
