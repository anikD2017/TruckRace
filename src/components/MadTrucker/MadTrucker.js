import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import toastr from 'toastr';
import * as madTruckerAction from '../../actions/madTruckerAction';


export class MadTrucker extends Component {
  constructor(props, context) {
    super(props, context);
    this.startRace = this.startRace.bind(this)
    this.backToBet = this.backToBet.bind(this)
    this.state = {
      isBtnDisabled: false,
      won:'',
      fundLeft:'',
      amontRemain: 0
    };
  }

  componentWillMount() {
    let totalAmt=0
    for(var i in this.props.placeBetReducer.data){
          totalAmt += +this.props.placeBetReducer.data[i];
    }
    this.setState({fundLeft: this.props.placeBetReducer.reaminingAmount-totalAmt})

  }

  componentWillReceiveProps(nextProps){
    let updatedAmount=0;
    let addAmt=[];
    let deductAmt=[];
    if(nextProps.madTruckerReducer[0].randomNum != null){
    for(let i in nextProps.placeBetReducer.data){
      if(nextProps.placeBetReducer.data[i] && i==`test${nextProps.madTruckerReducer[0].randomNum}`){
          this.setState({won:'Hurray!You won'})
          toastr.success('You won!!')

    } else if (nextProps.placeBetReducer.data[i] != '' && i!=`test${nextProps.madTruckerReducer[0].randomNum}`){
        updatedAmount -= +nextProps.placeBetReducer.data[i];
    }

  }
}
  this.setState({amontRemain: updatedAmount});

  if(typeof nextProps.madTruckerReducer[0] == 'number'){this.context.router.push('/placeBet');}
}

  startRace() {
    const step=10;
    console.log(document.getElementsByClassName('truck'));
    const divCount = document.getElementsByClassName('truck');
    const width = document.getElementsByClassName('raceTrackWrapper')[0].clientWidth - document.getElementsByClassName('truck')[0].clientWidth;
    let randomNum = Math.floor(Math.random()*divCount.length);

    this.setState({isBtnDisabled: true});

    for(let x=0;x<divCount.length;x++){
      let id = document.getElementsByClassName('truck')[x];
      let timer = setInterval(function(){
        if(x<width){
            x= (x==randomNum)?x+step+100:x +step;
           id.style.left = x+'px';
        }else{
            clearTimeout(timer);

        }
        }, 20);
    }
    setTimeout(() => {
      this.props.actions.setVal(randomNum)
    },2000)

  }

  backToBet() {
    this.props.actions.redirectToBet(this.state.amontRemain);
  }


  createTruck(){
    console.log(this.props);
    const html = `<div class="truck">
                  </div>`;


    let htmlArray=[];
    let totalAmt=0
    for(var i in this.props.placeBetReducer.data){
          totalAmt += +this.props.placeBetReducer.data[i];
         htmlArray.push({html,amt:this.props.placeBetReducer.data[i]});
      }
      console.log(htmlArray);
     console.log(totalAmt);

      const truckRow = htmlArray.map((el,i)=>{

          return (<div key={i}><div dangerouslySetInnerHTML={{__html: el.html}}></div><span>{el.amt?`$${el.amt}`:''}</span></div>)
        }
      );
      return(
        <div>{truckRow}</div>
      );
    }

  render() {
    if(this.state.fundLeft==0 && this.state.amontRemain<0){toastr.success('GAME END!!!Start from the beginning')}
      return (
      <div className="container">
        <h2>Mad Trucker {this.state.won} /
          <b> Fund($): {this.state.fundLeft}</b>/
          <i>Amount {this.state.amontRemain<=0 ? 'Lost':'Received'}($): {this.state.amontRemain}</i>
        </h2>
        <div className="raceTrackWrapper">
          {this.createTruck()}
         </div>
        <input type="button" disabled={this.state.isBtnDisabled} className="btn btn-default " value="Start Race" onClick={this.startRace}/>
        <input type="button" disabled={this.state.fundLeft==0 && this.state.amontRemain<0} className="btn btn-default" value="Place Bet" onClick={this.backToBet}/>
        <a className="btn btn-info shiftRight" href="http://localhost:3000/">Reset</a>
      </div>
    );
  }
}


MadTrucker.contextTypes = {
  router: PropTypes.object
};


function mapStateToProps(state) {
  console.log(state);
  return{
    madTruckerReducer: state.madTruckerReducer,
    placeBetReducer: state.placeBetReducer

  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(madTruckerAction, dispatch)
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(MadTrucker);
