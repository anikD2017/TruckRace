import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import toastr from 'toastr';
import * as placeBetAction from '../../actions/placeBetAction';

export class PlaceBet extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      numberOfTruck: []
    };
  }

  componentWillMount() {
    let tempCount=[]
    for(let i=0;i<this.props.gameSetUpReducer[0].numberOfTrucks;i++){
      tempCount.push(i)
    }
    this.setState({numberOfTruck: [...tempCount]})

    console.log(this.props);
  }

  componentWillReceiveProps(nextProps){
    console.log(nextProps)
    if(nextProps.placeBetReducer.redirect){
       this.context.router.push('/madRucker');
    }
  }

  handleChange() {
      let obj={};
      let reaminingAmount= (this.props.madTruckerReducer[0]+1000) || 1000;

      console.log(this.refs);
      let amount=null
      for(let i in this.refs){
        console.log(+this.refs[i].value);
        obj[i]= this.refs[i].value
         amount += +this.refs[i].value
      }
      console.log(obj);
    if(amount>reaminingAmount){
      toastr.error(`Please enter an amount within ${reaminingAmount}`)
    } else if(amount !== 0) {
      this.props.actions.placeBet(obj, reaminingAmount)
    }

  }

  createInput(){
     const inputEle = this.state.numberOfTruck.map((number,i)=>
         <div key={i}>
            <label>Truck{i+1}</label>
            <input key={number.toString()} type="text" ref={`test${i}`}
             onChange={this.handleInputChange} className="form-control" placeholder="Enter Amount"/>
         </div>
     );
     return(
       <div>{inputEle}</div>
     );
  }


  render() {
    const totalAmt = (this.props.madTruckerReducer[0]+1000) || 1000;
    return (
      <div className="container placeBet">
        <h2>Place Bet</h2>
        <p className="pull-right">Total Amount: ${totalAmt}</p>
        {this.createInput()}
        <input type="button" className="btn btn-default" value="Bet" onClick={this.handleChange}/>

      </div>
    );
  }
}

PlaceBet.contextTypes = {
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
    actions: bindActionCreators(placeBetAction, dispatch)
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(PlaceBet);
