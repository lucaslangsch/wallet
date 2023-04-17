import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';
import CardNews from '../components/CardNews';
// import { PropTypes } from 'prop-types';

class Wallet extends React.Component {
  render() {
    return (
      <div className="relative bg-emerald-600 h-screen">
        <Header />
        <WalletForm />
        <Table />
        <CardNews />
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
