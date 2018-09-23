import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Modal.scss';

class ModalComponent extends Component {
    componentDidMount() {
        document.body.classList.add('modal-open');
        if (this.props.closeOnDimmerClick) {
            document.addEventListener('click', this.dimmerClickHandler);
        }
    }
    
    componentWillUnmount() {
        document.body.classList.remove('modal-open');
        if (this.props.closeOnDimmerClick) {
            document.removeEventListener('click', this.dimmerClickHandler);
        }
    }

    dimmerClickHandler = (e) => {
        if (!e.target.closest('.modal')) {
            this.props.close();
        }
    }

    render() {
        const { title, component: Component, close, data } = this.props;
        return (
            <div className='modal-wrapper'>
                <div className='modal'>
                    <div className='modal__header'>
                        <h3>{title}</h3>
                    </div>
                    <div className='modal__body'>
                        <Component closeModal={close} data={data} />
                    </div>
                </div>
            </div>
        );
    }
}

class Modal extends Component {
    static propTypes = {
        component: PropTypes.func.isRequired,
        title: PropTypes.string,
        close: PropTypes.func.isRequired,
        data: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.array,
            PropTypes.string,
            PropTypes.number,
        ]),
        open: PropTypes.bool.isRequired,
        closeOnDimmerClick: PropTypes.bool,
    }

    static defaultProps = {
        title: 'Modal',
        closeOnDimmerClick: true
    }

    render() {
        return this.props.open
            ? <ModalComponent {...this.props} />
            : null;
    }
}

export default Modal;
