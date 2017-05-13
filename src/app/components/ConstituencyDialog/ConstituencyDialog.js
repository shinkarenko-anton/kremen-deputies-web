// React
import React from "react";
// Redux
import {connect} from 'react-redux';
import actions from '../../shared/Redux/Actions';
// Utils
import _ from 'lodash';
import utils from '../../shared/Services/Utils';
// UI
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
// Elements
import DeputieInfo from './DeputieInfo';


// Redux
const mapStateToProps = (state) => ({
    deputies: state.deputies,
});

const mapDispatchToProps = (dispatch) => ({

});


// Utils
const constituencyToVotersCount = (constituency) => {
    let votersCount = 0;
    if(constituency.stations && constituency.stations.length){
        _.each(constituency.stations, station => {
            if(station.numberOfVoters){
                votersCount += parseInt(station.numberOfVoters);
            }
        });
    }
    return votersCount;
}


// ConstituencyDialog
class ConstituencyDialog extends React.Component{
    constructor(props){
        super(props);
        this.state = {}
    }

    // Render

    render(){
        let constituency = this.props.item;
        if(!constituency) return null;

        let votersCount = constituencyToVotersCount(constituency);

        // Actions
        const actions = [
            <FlatButton
                label="Закрити"
                primary={true}
                onTouchTap={(e) => {e.stopPropagation(); this.props.onClose()}}/>
        ];

        let deputies = _.map(constituency.deputies, (deputieId) => {
            return this.props.deputies[deputieId];
        });

        return (
            <Dialog
                title={"Виборчий округ №" + constituency.number + " (" + votersCount + " чоловік)"}
                actions={actions}
                modal={false}
                open={this.props.open}
                onRequestClose={() => this.props.onClose()}>
                <div style={{height: '70vh', overflowY: 'scroll', overflowX: 'hidden'}}>
                    {_.map(deputies, (deputie, index) => (
                        <DeputieInfo 
                            key={index}
                            deputie={deputie}
                            style={ index > 0 ? {marginTop: 20, paddingTop: 20, borderTop: '1px dashed rgba(0, 0, 0, .4)'} : null}
                        />
                    ))}
                </div>
            </Dialog>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConstituencyDialog); 