import React, { Component } from 'react';
import { PageHeader } from "antd";
import * as Constants from '../constants/AppConstants'

export default class Header extends Component {

    render() {
        return (
            <div>
                <PageHeader
                    className="header"
                    title={Constants.LABELS.header_title}
                    extra={Constants.LABELS.link_vote_challenge}/>
            </div>
        )
    }
}
