import React from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';

import { getVisualInfo } from '../selectors/visual';

import VisualSelection from './VisualSelection';
import VisualDatGui from './VisualDatGui';
import AudioDatGui from './AudioDatGui';

class VisualControlPanel extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      activeMenu: 'settings'
    };
  }

  onMenuChange = (e) => {
    const clickedButton = e.target;
    let activeMenu = undefined;
    if ($(clickedButton).hasClass('settings')) {
      activeMenu = 'settings';
    }
    else if ($(clickedButton).hasClass('select')) {
      activeMenu = 'select';
    }
    if (activeMenu === undefined) {
      $('#stats-graph').fadeOut();
    }
    else{
      $('#stats-graph').fadeIn();
    }
    this.setState( () => ({activeMenu}));
  };


  render(){

    return(
      <div id="VisualControlPanel">

        {this.state.activeMenu === undefined && (
          <div>
            <button className="viscontrol--menubuttons exterior settings"
              onClick={this.onMenuChange}></button>
            <button className="viscontrol--menubuttons exterior select"
              onClick={this.onMenuChange}></button>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = ({visual}) => {
  const {title, type, renderer, description} = getVisualInfo(visual);
  return{
    title, type, renderer, description,
    settings: visual.visualSettings
  }
}

export default connect(mapStateToProps)(VisualControlPanel);
