// React
import React from "react";
// Utils
import _ from 'lodash';
import utils from '../../Shared/Services/Utils';
// UI
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

// Style
const style = {
    container: {
        display: 'flex',
        flexDirection: 'row'
    },
    avatar: {
        width: 140,
        marginRight: 12
    },
    avatarImg: {
        width: '100%'
    },
    dataContainer: {
        flex: 1
    },
    row: {
        marginBottom: 12,
        display: 'flex',
        flexDirection: 'row'
    },
    rowIcon: {
        display: 'inline-block',
        width: 20,
        marginRight: 6,
        textAlign: 'center'
    },
    rowData: {
        flex: 1
    }
}

// DeputieDialog
export default class DeputieDialog extends React.Component{
    constructor(props){
        super(props);
        this.state = {}
    }

    // Render

    render(){
        let item = this.props.item;
        if(!item) return null;

        // Polling stattions
        let votersCount = 0;
        if(item.pollingStations && item.pollingStations.length){
            _.each(item.pollingStations, station => {
                if(station.numberOfVoters){
                    votersCount += parseInt(station.numberOfVoters);
                }
            });
        }
        
        // Actions
        const actions = [
            <FlatButton
                label="Закрити"
                primary={true}
                onTouchTap={(e) => {e.stopPropagation(); this.props.onClose()}}/>
        ];

        return (
            <Dialog
                title={item.name}
                actions={actions}
                modal={false}
                open={this.props.open}
                onRequestClose={() => this.props.onClose()}>
                <div style={style.container}>
                    {item.avatar ? (
                    <div style={style.avatar}>
                        <img src={item.avatar} style={style.avatarImg} />
                    </div>
                    ) : null}
                    <div style={style.dataContainer}>
                        <div style={style.row}>Виборчий округ: {item.locationId}</div>
                        {votersCount ? (
                        <div style={style.row}>
                            <div style={style.rowIcon}><i className="fa fa-user"></i></div>
                            <div style={style.rowData}>{votersCount}</div>
                        </div>
                        ) : null}
                        {item.schedule ? (
                        <div style={style.row}>
                            <div style={style.rowIcon}><i className="fa fa-calendar"></i></div>
                            <div style={style.rowData}>{utils.str.capitalizeFirstLetter(item.schedule)}</div>
                        </div>
                        ) : null}
                        {item.address ? (
                        <div style={style.row}>
                            <div style={style.rowIcon}><i className="fa fa-map-marker"></i></div>
                            <div style={style.rowData}>{utils.str.capitalizeFirstLetter(item.address)}</div>
                        </div>
                        ) : null}
                        {item.facebook ? (
                        <div style={style.row}>
                            <div style={style.rowIcon}><i className="fa fa-facebook-official"></i></div>
                            <div style={style.rowData}>
                                <a href={item.facebook} target="__blank">{item.facebook}</a>
                            </div>
                        </div>
                        ) : null}
                        {item.twitter ? (
                        <div style={style.row}>
                            <div style={style.rowIcon}><i className="fa fa-twitter"></i></div>
                            <div style={style.rowData}>
                                <a href={item.twitter} target="__blank">{item.twitter}</a>
                            </div>
                        </div>
                        ) : null}
                        {item.vk ? (
                        <div style={style.row}>
                            <div style={style.rowIcon}><i className="fa fa-vk"></i></div>
                            <div style={style.rowData}>
                                <a href={item.vk} target="__blank">{item.vk}</a>
                            </div>
                        </div>
                        ) : null}
                        {item.phones && item.phones.length ? (
                            _.map(item.phones, (phoneItem, key) => (
                                <div key={key} style={style.row}>
                                    <div style={style.rowIcon}><i className="fa fa-phone"></i></div>
                                    <div style={style.rowData}>
                                        <a href={"tel:" + phoneItem} target="__blank">{phoneItem}</a>
                                    </div>
                                </div>
                            ))
                        ) : null}
                    </div>
                </div>
            </Dialog>
        );
    }
}