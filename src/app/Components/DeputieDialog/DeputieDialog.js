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
                <div>
                    <div>Виборчий округ</div>
                    <div>{item.locationId}</div>
                    <div>День та години прийому</div>
                    <div>{item.schedule}</div>
                    <div>Місце прийому</div>
                    <div>{item.address}</div>
                    <div>Телефон</div>
                    <div>{item.phone}</div>
                </div>
            </Dialog>
        );
    }
}