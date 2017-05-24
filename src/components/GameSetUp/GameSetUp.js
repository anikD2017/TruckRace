import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import toastr from 'toastr';
import * as gameSetUpAction from '../../actions/gameSetUpAction';

export class GameSetUp extends Component {
  constructor(props, context) {
    super(props, context);
    this.redirect = this.redirect.bind(this)
    this.onChange = this.onChange.bind(this)
    this.state = {
       fund:1000,
       playerName: '',
       numberOfTrucks:''
    };
  }

  onChange(e){
    this.setState({[e.target.name]:e.target.value})
  }

  redirect(){
    //this.context.router.push('/placeBet');
    const setUpObj = {
      playerName: this.state.playerName,
      numberOfTrucks: this.state.numberOfTrucks
    }
    if(setUpObj.playerName !== '' && setUpObj.numberOfTrucks !== '' && setUpObj.numberOfTrucks >3){
      this.props.actions.startGame(setUpObj)
    }else{
        toastr.error('Please enter your name & Number Of Trucks should be greater than 3');
    }

  }

  componentWillReceiveProps(nextProps){
    if(nextProps.gameSetUpReducer[0].numberOfTrucks){
       this.context.router.push('/placeBet');
    }
  }


  render() {
    return (
      <div className="container">
        <h2>Game Setup</h2>
        <form className="form-horizontal" noValidate>
          <div className="form-group">
             <label className="col-sm-2 control-label">Player Name</label>
             <div className="col-sm-10">
              <input type="text" value={this.state.playerName} className="form-control"
                placeholder="Enter Player Name" onChange={this.onChange} name="playerName"/>
             </div>
          </div>
          <div className="form-group">
             <label className="col-sm-2 control-label">Number of Truckers</label>
             <div className="col-sm-10">
              <input type="text" value={this.state.numberOfTrucks} className="form-control"
                placeholder="Enter Number of Truckers" name="numberOfTrucks"  onChange={this.onChange} />
             </div>
          </div>
          <div className="form-group">
             <label className="col-sm-2 control-label">Initial Funds</label>
             <div className="col-sm-10">
              <input type="text" className="form-control" placeholder="Initial Funds" value={this.state.fund} onChange={this.onChange}/>
             </div>
          </div>
          <input type="button" className="btn btn-default" value="Start Game" onClick={this.redirect}/>
        </form>
      </div>
    );
  }
}

GameSetUp.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state) {
  return{
    gameSetUpReducer: state.gameSetUpReducer,
    placeBetReducer: state.placeBetReducer,
    madTruckerReducer: state.madTruckerReducer
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(gameSetUpAction, dispatch)
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(GameSetUp);
