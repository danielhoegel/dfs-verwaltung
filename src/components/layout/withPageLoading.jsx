import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setPageLoading, unsetPageLoading } from './redux/layoutActions';

function withPageLoading(PageComponent) {
    return connect(null, {
        setPageLoading,
        unsetPageLoading
    })(class extends Component {
        constructor(props) {
            super(props);
            props.setPageLoading();
            setTimeout(() => {
                window.requestAnimationFrame(() => {
                    props.unsetPageLoading();
                });
            }, 0);
        }
    
        render() {
            return <PageComponent {...this.props} />
        }
    });
}

export default withPageLoading;