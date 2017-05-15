// React
import React from "react";
// UI
import Paper from 'material-ui/Paper';

// ContentPage
export default function ContentPage(props){
    return (
        <div className="content-page">
            <Paper className="content-page__content">
                {props.children}
            </Paper>
        </div>
    );
}