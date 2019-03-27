import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import 'popper.js/dist/popper';


import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import Grow from '@material-ui/core/Grow';
import Typography from '@material-ui/core/Typography';
import RootRef from '@material-ui/core/RootRef';
import CloseIcon from '@material-ui/icons/Close';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { stringsMatch, isNotEmpty } from '../helper/helper';


class SearchSelect extends Component {
    /**
     * This components controlls the Search component by filtering
     * the initially given options based on the searchInput
     */
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.noFiltering && nextProps.options !== prevState.matchingOptions) {
            return {
                matchingOptions: nextProps.options
            };
        }

        // reset state on external value reset
        if (nextProps.value === '' && prevState._value !== '') {
            return {
                inputValue: '',
                activeIndex: 0,
                matchingOptions: nextProps.options,
                _value: nextProps.value,
                _options: nextProps.options
            };
        }
        if (
            (nextProps.value !== prevState._value) ||
            (nextProps.options && prevState._options &&
                nextProps.options.length !== prevState._options.length
            )
        ) {
            const option = nextProps.options && nextProps.options
                .filter(_option => _option.value === nextProps.value)[0];
            return {
                inputValue: option ? option.label : '',
                activeIndex: 0,
                _value: nextProps.value,
                _options: nextProps.options
            };
        }
        return null;
    }

    state = {
        _value: '',
        _options: null,
        inputValue: '',
        hasFocus: false,
        activeIndex: 0,
        matchingOptions: this.props.options
    }

    anchorEl = React.createRef()
    menuEl = React.createRef()

    shouldComponentUpdate(nextProps, nextState) {
        return (
            (nextProps.name !== this.props.name) ||
            (nextProps.label !== this.props.label) ||
            (nextProps.value !== this.props.value) ||
            (nextProps.options !== this.props.options) ||

            (nextState.inputValue !== this.state.inputValue) ||
            (nextState.hasFocus !== this.state.hasFocus) ||
            (nextState.activeIndex !== this.state.activeIndex) ||
            (nextState.matchingOptions !== this.state.matchingOptions)
        );
    }


    componentDidUpdate(prevProps, prevState) {
        // Adjust scroll so the active MenuItem is always in view.
        if (prevState.activeIndex !== this.state.activeIndex) {
            const menu = this.menuEl;

            if (menu) {
                const { activeIndex } = this.state;
                const menuItems = this.props.grouped
                    ? menu.querySelectorAll('.groupedItem > *')
                    : menu.children;


                if (activeIndex === 0) {
                    // scroll to the top for first element
                    menu.scrollTop = 0;
                } else if (activeIndex === menuItems.length - 1) {
                    // scroll to the bottom for the last element
                    menu.scrollTop = menu.scrollHeight;
                    // scrollHeight = (overflowing) height with all children
                } else {
                    // scroll to activeElement top/bottom
                    const item = menuItems[activeIndex];
                    const offsetUp = item.offsetTop;
                    const offsetDown = item.offsetTop + item.offsetHeight;
                    // clientHeight = outer height with borders

                    if (offsetUp < menu.scrollTop) {
                        // scroll up
                        menu.scrollTop = offsetUp;
                    } else if (offsetDown > (menu.offsetHeight + menu.scrollTop)) {
                        // scroll down
                        const offsetDiff = offsetDown - (menu.offsetHeight + menu.scrollTop);
                        // offsetHeight = inner height
                        menu.scrollTop += offsetDiff;
                    }
                }
            }
        }
    }

    optionForValue() {
        return this.props.options && this.props.options
            .filter(option => option.value === this.props.value)[0];
    }

    resetInput() {
        const option = this.optionForValue();
        if (this.props.onChange) {
            this.props.onChange({ target: { value: '' }});
        }
        this.setState({
            inputValue: option ? option.label : '',
            matchingOptions: this.props.options,
            hasFocus: false,
        });
    }

    clearValue = () => {
        if (this.props.onChange) {
            this.props.onChange({ target: { value: '' }});
        }
        this.changeValue('');
        this.setState({
            inputValue: '',
            matchingOptions: this.props.options
        });
    }

    changeValue = (value, group) => {
        const { name } = this.props;
        this.anchorEl.blur();
        this.props.onSelect({ target: { name, value }}, group);
    }

    clickHandler = (e) => {
        const _target = e.currentTarget;
        const value = _target.getAttribute('data-value');
        const group = _target.getAttribute('data-group');
        this.changeValue(value, group);
    }

    focusHandler = () => {
        this.setState({ hasFocus: true });
    }

    blurHandler = ({ currentTarget }) => {
        setTimeout(() => {
            if (!currentTarget.contains(document.activeElement)) {
                this.resetInput();
            }
        }, 1);
    }

    inputChangeHandler = (e) => {
        const { value } = e.target;
        if (this.props.onChange) {
            this.props.onChange(e);
        }
        this.setState({
            inputValue: (isNaN(value) || value === '') ? value : Number(value),
            activeIndex: 0
        }, this.filterMatchingOptions);
    }

    dropdownIconClickHandler = (e) => {
        if (this.anchorEl !== document.activeElement) {
            this.anchorEl.focus();
        }
        this.setState({
            matchingOptions: this.props.options
        });
    }

    keyEventHandler = (e) => {
        const { matchingOptions, activeIndex } = this.state;
        const option = matchingOptions[activeIndex];

        switch (e.key) {
            case 'ArrowUp':
                this.setState(state => ({
                    activeIndex: state.activeIndex === 0
                        ? matchingOptions.length - 1
                        : state.activeIndex - 1
                }));
                break;

            case 'ArrowDown':
                this.setState(state => ({
                    activeIndex: state.activeIndex === matchingOptions.length - 1
                        ? 0
                        : state.activeIndex + 1
                }));
                break;

            case 'Enter':
                if (option) {
                    this.changeValue(option.value, option.group);
                }
                break;

            case 'Escape':
                e.preventDefault();
                this.anchorEl.blur();
                break;

            default:
                break;
        }
    }

    filterMatchingOptions() {
        if (this.state.inputValue === '') {
            this.setState({ matchingOptions: this.props.options });
        } else if (!this.props.noFiltering && this.state.inputValue) {
            const matchingOptions = this.props.options.filter(option => {
                return this.state.inputValue.split(' ').every(inputWord => {
                    if (option.searchValues) {
                        return option.searchValues.some(value =>
                            stringsMatch(value, inputWord)
                        );
                    }
                    const searchValue = option.label || option.value;
                    return stringsMatch(searchValue, inputWord);
                });
            });
            this.setState({ matchingOptions });
        }
    }

    formatLabel(label) {
        const { inputValue } = this.state;
        if (inputValue.length > 0) {
            const inputWords = inputValue.split(' ');
            const labelWords = label.split(' ');

            const outputWords = labelWords.map(labelWord => {
                let outputWord = labelWord;
                for (let i = 0; i < inputWords.length; i++) {
                    const inputWord = inputWords[i];
                    const startIndex = labelWord.toLowerCase().indexOf(inputWord.toLowerCase());

                    if (startIndex !== -1) {
                        const matchingPart = labelWord.slice(startIndex, startIndex + inputWord.length);
                        const beforePart = labelWord.slice(0, startIndex);
                        const afterPart = labelWord.slice(startIndex + inputWord.length);

                        outputWord = `${beforePart}<strong>${matchingPart}</strong>${afterPart}`;
                        break;
                    }
                }
                return outputWord;
            });

            return <span dangerouslySetInnerHTML={{ __html: outputWords.join(' ') }} />;
        }
        return <span>{label}</span>;
    }

    menuIsVisible() {
        const { matchingOptions, hasFocus } = this.state;
        return (
            hasFocus &&
            !this.props.disabled &&
            isNotEmpty(this.props.options) && (
                matchingOptions.length > 1 || (
                    matchingOptions.length === 1 &&
                    matchingOptions[0].value !== this.props.value
                )
            )
        );
    }

    renderOptions() {
        const { grouped, classes } = this.props;
        const { matchingOptions, activeIndex } = this.state;

        const groupedOptions = {};
        const options = [];

        matchingOptions.forEach((option, index) => {
            const menuItem = (
                <MenuItem
                    key={option.value}
                    data-value={option.value}
                    data-group={option.group}
                    onMouseDown={this.clickHandler}
                    className={classes.menuItem}
                    style={{ backgroundColor: index === activeIndex && 'rgba(0,0,0,0.1)' }}
                >
                    {this.formatLabel(option.label)}
                    {option.secondary && (
                        <div className={classes.secondaryLabel}>
                            {option.secondary}
                        </div>
                    )}
                </MenuItem>
            );
            if (grouped) {
                if (groupedOptions[option.group]) {
                    groupedOptions[option.group].push(menuItem);
                } else {
                    groupedOptions[option.group] = [menuItem];
                }
            } else {
                options.push(menuItem);
            }
        });

        if (grouped) {
            return Object.entries(groupedOptions).map(([group, listItems]) => (
                <div className={classes.optionGroup} key={group}>
                    <Typography variant='body2' className={classes.groupHeader}>
                        {group}
                    </Typography>
                    <div className={cn('groupedItem', classes.groupItems)}>
                        {listItems}
                    </div>
                </div>
            ));
        }

        return options;
    }

    render() {
        const { classes, theme, popperPlacement } = this.props;
        const selectWidth = this.anchorEl.current !== null && this.anchorEl.parentNode.clientWidth;

        const menuIsVisible = this.menuIsVisible();

        return (
            <FormControl
                onBlur={this.blurHandler}
                onFocus={this.focusHandler}
                tabIndex={-1}
                className={cn(classes.formControl, this.props.className)}
                style={this.props.style}
                disabled={this.props.disabled}
                required={this.props.required}
            >
                {this.props.label && (
                    <InputLabel htmlFor={`searchSelect__${this.props.name}__input`}>
                        {this.props.label}
                    </InputLabel>
                )}
                <Input
                    id={`searchSelect__${this.props.name}__input`}
                    value={this.state.inputValue}
                    onChange={this.inputChangeHandler}
                    onKeyDown={this.keyEventHandler}
                    aria-describedby={`searchSelect__${this.props.name}__popper`}
                    inputRef={el => { this.anchorEl = el; }}
                    autoComplete='off'
                    placeholder={this.props.placeholder}
                    className={cn(classes.input, this.props.inputClassName)}
                    style={{
                        paddingRight: (
                            0 +
                            3 * !this.props.noDropdownIcon +
                            2 * !this.props.noClearIcon
                        ) * theme.spacing.unit
                    }}
                    {...this.props.inputProps}
                    endAdornment={
                        <Fragment>
                            {!this.props.noClearIcon && (this.props.value || this.state.inputValue) && (
                                <CloseIcon
                                    className={classes.clearIcon}
                                    onClick={this.clearValue}
                                />
                            )}
                            {!this.props.noDropdownIcon && (
                                <ArrowDropDownIcon
                                    className={classes.dropdownIcon}
                                    onClick={this.dropdownIconClickHandler}
                                />
                            )}
                        </Fragment>
                    }
                />
                <Popper
                    open={menuIsVisible}
                    anchorEl={this.anchorEl}
                    id={`searchSelect__${this.props.name}__popper`}
                    transition
                    placement={popperPlacement || 'bottom-start'}
                    className={cn(classes.popper, this.props.popperClassName)}
                    style={{ minWidth: selectWidth }}
                >
                        {({ TransitionProps }) => (
                        <Grow {...TransitionProps} timeout={150}>
                            <Paper
                                elevation={8}
                                className={cn(
                                    classes.menuWrapper,
                                    { [classes.attachedMenu]: !this.props.floatingMenu },
                                    { [classes.floatingMenu]: this.props.floatingMenu }
                                )}
                            >
                                <RootRef rootRef={el => { this.menuEl = el; }}>
                                    <MenuList
                                        className={classes.menu}
                                        style={{ maxHeight: this.props.maxHeight }}
                                    >
                                        {this.renderOptions()}
                                    </MenuList>
                                </RootRef>
                            </Paper>
                        </Grow>
                        )}
                </Popper>
            </FormControl>
        );
    }
}

SearchSelect.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    onSelect: PropTypes.func.isRequired,
    onChange: PropTypes.func,
    options: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]).isRequired,
        label: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        searchValues: PropTypes.array,
    })),
    disabled: PropTypes.bool,
    required: PropTypes.bool,
    className: PropTypes.string,
    style: PropTypes.object,
    noClearIcon: PropTypes.bool,
};

const styles = theme => ({
    formControl: {
        outline: 0
    },
    popper: {
        zIndex: theme.zIndex.modal,
    },
    menuWrapper: {
        overflow: 'hidden',
    },
    attachedMenu: {
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
    },
    floatingMenu: {
        marginTop: theme.spacing.unit,
    },
    menu: {
        maxHeight: 30 * theme.spacing.unit, // 240px
        overflowY: 'auto',
        minWidth: '100%'
    },
    input: {
        paddingRight: 5 * theme.spacing.unit // clearIcon + dropdownIcon
    },
    dropdownIcon: {
        color: 'rgba(0, 0, 0, 0.54)',
        cursor: 'pointer',
        fontSize: 3 * theme.spacing.unit, // default value
        position: 'absolute',
        right: 0
    },
    clearIcon: {
        color: 'rgba(0, 0, 0, 0.54)',
        cursor: 'pointer',
        fontSize: 2 * theme.spacing.unit,
        position: 'absolute',
        right: 3 * theme.spacing.unit // dropdownIcon
    },
    optionGroup: {
        marginTop: 2 * theme.spacing.unit,
        marginBottom: 2 * theme.spacing.unit,
        outline: 0
    },
    groupHeader: {
        borderBottom: [[1, 'solid', theme.palette.secondary.main]],
        fontWeight: 300,
        marginLeft: 2 * theme.spacing.unit,
        marginRight: 2 * theme.spacing.unit,
        display: 'flex',
        justifyContent: 'space-between'
    },
    groupItems: {
        // paddingLeft: 2 * theme.spacing.unit,
    },
    menuItem: {
        display: 'block',
        lineHeight: 1,
        height: 'auto'
    },
    secondaryLabel: {
        opacity: 0.5,
        fontSize: '0.75em',
        marginTop: 0.5 * theme.spacing.unit
    }
});

export default (withStyles(styles, { withTheme: true })(SearchSelect));
