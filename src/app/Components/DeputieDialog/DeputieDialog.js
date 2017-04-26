// React
import React from "react";
// UI
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

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
                color: 'white',
                marginBottom: 12,
                display: 'flex',
                flexDirection: 'row'
            },
            rowIcon: {
                display: 'inline-block',
                width: 20,
                marginRight: 6
            },
            rowData: {
                flex: 1
            }
        }

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
                        {item.schedule ? (
                        <div style={style.row}>
                            <div style={style.rowIcon}><i className="fa fa-calendar"></i></div>
                            <div style={style.rowData}>{item.schedule}</div>
                        </div>
                        ) : null}
                        {item.address ? (
                        <div style={style.row}>
                            <div style={style.rowIcon}><i className="fa fa-map-marker"></i></div>
                            <div style={style.rowData}>{item.address}</div>
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
                                    <div style={style.rowData}>{phoneItem}</div>
                                </div>
                            ))
                        ) : null}
                    </div>
                </div>
            </Dialog>
        );
    }
}