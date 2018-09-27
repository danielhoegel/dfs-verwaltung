import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Tabs.scss';

class Tabs extends Component {
    static propTypes = {
        tabs: PropTypes.arrayOf(PropTypes.shape({
            key: PropTypes.oneOfType([
                PropTypes.number,
                PropTypes.string,
            ]),
            title: PropTypes.string,
            body: PropTypes.oneOfType([
                PropTypes.object,
                PropTypes.arrayOf(PropTypes.object),
            ]),
        })),
    }

    state = {
        tab: 0
    }
    
    render() {
        const { tabs } = this.props;
        return (
            <div className='tabs'>
                <div className='tabs__header'>
                    {tabs.map(tab => (
                        <div
                            key={tab.key}
                            className={'tabs__title' + (tab.key === this.state.tab ? ' active' : '')}
                            onClick={() => this.setState({ tab: tab.key })}
                        >
                            {tab.title}
                        </div>
                    ))}
                </div>
                <div className='tabs__body'>
                    {tabs.map(tab => (
                        <div
                            key={tab.key}
                            className={'tabs__tab' + (tab.key === this.state.tab ? ' active' : '')}
                        >
                            {tab.body}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default Tabs;
