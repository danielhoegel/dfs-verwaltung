import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import 'popper.js/dist/popper';

import { isNotEmpty, highlightMatch } from '../helper/helper';

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


const MenuOption = ({
    option,
    onClick,
    classes,
    isActive,
    searchValue,
    menuItemClassName,
    activeMenuItemClassName
}) => {
    const highlightedLabel = highlightMatch(option.label, searchValue);
    return (
        <MenuItem
            data-value={option.value}
            data-group={option.group}
            onMouseDown={onClick}
            className={cn(
                classes.menuItem,
                menuItemClassName,
                { [classes.activeMenuItem]: isActive },
                { [activeMenuItemClassName]: isActive },
            )}
        >
            <span
                dangerouslySetInnerHTML={{ __html: highlightedLabel }}
            />
            {option.secondary && (
                <div className={classes.secondaryLabel}>
                    {option.secondary}
                </div>
            )}
        </MenuItem>
    );
};

let searchId = 0;

class Search extends PureComponent {
    /**
     * This component displays a selectable menu with items (options)
     * and a text input (searchValue). The options and the searchValue
     * have to be controlled by props
     */

    state = {
        hasFocus: false,
        activeIndex: 0,
    }

    anchorEl = React.createRef()
    menuEl = React.createRef()
    id = this.props.name || searchId;

    componentDidMount() {
        if (!this.props.name) {
            searchId += 1;
        }
    } 
    
    componentDidUpdate(prevProps, prevState) {
        // Adjust scroll so the active MenuItem is always in view.
        if (prevState.activeIndex !== this.state.activeIndex) {
            const { activeIndex } = this.state;
            const menu = this.menuEl.current;
            
            if (menu) {
                const menuItems = this.props.grouped
                    ? menu.querySelectorAll('.groupedItem > *')
                    : menu.children;
                
    
                // scroll to the top for first element
                if (activeIndex === 0) {
                    menu.scrollTop = 0;
                }
                
                // scroll to the bottom for the last element
                else if (activeIndex === menuItems.length - 1) {
                    menu.scrollTop = menu.scrollHeight;
                    // scrollHeight = (overflowing) height with all children
                }
                
                // scroll to activeElement top/bottom
                else {
                    const item = menuItems[activeIndex];
                    const offsetUp = item.offsetTop;
                    const offsetDown = item.offsetTop + item.offsetHeight;
                    // clientHeight = outer height with borders
                    
                    // scroll up
                    if (offsetUp < menu.scrollTop) {
                        menu.scrollTop = offsetUp;
                    }
                    
                    // scroll down
                    else if (offsetDown > (menu.offsetHeight + menu.scrollTop)) {
                        const offsetDiff = offsetDown - (menu.offsetHeight + menu.scrollTop);
                        // offsetHeight = inner height
                        menu.scrollTop += offsetDiff;
                    }
                }
            }
        }

        // Adjust marginLeft of popper to align to the right of the input
        if (!this.props.fixedWidth && this.props.popperAlign === 'right' && isNotEmpty(this.props.options)) {
            if (this.anchorEl && this.menuEl.current) {
                const inputWidth = this.anchorEl.clientWidth;
                const popper = this.menuEl.current.parentNode.parentNode;
                const popperWidth = popper.clientWidth;

                // use marginLeft to adjust width difference
                popper.style.marginLeft = `${inputWidth - popperWidth}px`;
                // set fixed width to avoid jumping on closing
                // popper.style.width = `${popperWidth}px`; // BUG: popper size doe no longer adjust
            } else {
                // Force rerender if options are available but refs are not defined
                this.forceUpdate();
            }
        }
    }

    changeInput(value) {
        this.props.onInputChange(value);
        this.setState({ activeIndex: 0 });
    }

    selectOption(value, group) {
        this.anchorEl.blur();
        this.props.onSelect(value, group);
    }

    resetInput() {
        this.changeInput('');
        this.setState({ hasFocus: false, });
    }

    focusHandler = () => {
        this.setState({ hasFocus: true });
    }

    blurHandler = (e) => {
        const currentTarget = e.currentTarget;
        setTimeout(() => {
            if (!currentTarget.contains(document.activeElement)) {
                this.resetInput();
            }
        }, 1);
    }

    inputChangeHandler = (e) => {
        this.changeInput(e.target.value);
    }

    clickHandler = (e) => {
        const currentTarget = e.currentTarget;
        const value = currentTarget.getAttribute('data-value');
        const group = currentTarget.getAttribute('data-group');
        this.selectOption(value, group)
    }

    dropdownIconClickHandler = (e) => {
        if (this.anchorEl !== document.activeElement) {
            this.anchorEl.focus();
        }
    }

    clearIconClickHandler() {
        this.changeInput('');
        this.selectOption('');
    }

    keyEventHandler = (e) => {
        const { options } = this.props;
        const { activeIndex } = this.state;

        switch (e.key) {
            case 'ArrowUp':
                this.setState(state => ({
                    activeIndex: state.activeIndex === 0 
                        ? options.length - 1
                        : state.activeIndex - 1
                }));
                break;

            case 'ArrowDown':
                this.setState(state => ({
                    activeIndex: state.activeIndex === options.length - 1
                        ? 0
                        : state.activeIndex + 1
                }));
                break;

            case 'Enter':
                const option = options[activeIndex];
                if (option) {
                    this.selectOption(option.value, option.group);
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

    renderOptions() {
        const { activeIndex } = this.state;
        const {
            options,
            grouped,
            menuItemClassName,
            searchValue,
            activeMenuItemClassName,
            classes
        } = this.props;

        const menuItems = [];
        const groupedMenuItems = {};

        options.forEach((option, index) => {

            const OptionComponent = (
                <MenuOption
                    option={option}
                    onClick={this.clickHandler}
                    classes={classes}
                    isActive={index === activeIndex}
                    searchValue={searchValue}
                    menuItemClassName={menuItemClassName}
                    activeMenuItemClassName={activeMenuItemClassName}
                    key={(option.group ? `${option.group}-` : '') + option.value}
                />
            );

            if (grouped) {
                if (groupedMenuItems[option.group]) {
                    groupedMenuItems[option.group].push(OptionComponent);
                } else {
                    groupedMenuItems[option.group] = [ OptionComponent ];
                }
            } else {
                menuItems.push(OptionComponent);
            }
        });

        if (grouped) {
            return Object.entries(groupedMenuItems).map(([ group, listItems ]) => (
                <div className={classes.optionGroup} key={group}>
                    <Typography variant='body2' className={classes.groupHeader}>
                        {group}
                    </Typography>
                    <div className={cn('groupedItem', classes.groupItems)}>
                        {listItems}
                    </div>
                </div>
            ));
        } else {
            return menuItems;
        }
    }

    render() {
        const { classes, theme } = this.props;
        const selectMinWidth = this.props.recalculatePopperAlignemt || (this.anchorEl.current !== null && this.anchorEl.parentNode.clientWidth);
        const menuIsVisible = this.state.hasFocus && isNotEmpty(this.props.options);

        return (
            <FormControl
                onBlur={this.blurHandler}
                onFocus={this.focusHandler}
                tabIndex={-1}
                className={cn(classes.formControl, this.props.className)}
                style={this.props.style}
            >
                {this.props.label && (
                    <InputLabel
                        htmlFor={`search__${this.id}__input`}
                        className={this.props.labelClassName}
                    >
                        {this.props.label}
                    </InputLabel>
                )}
                <Input
                    id={`search__${this.id}__input`}
                    value={this.props.searchValue}
                    onChange={this.inputChangeHandler}
                    onKeyDown={this.keyEventHandler}
                    aria-describedby={`search__${this.id}__popper`}
                    inputRef={el => { this.anchorEl = el; }}
                    placeholder={this.props.placeholder}
                    autoComplete='off'
                    style={{
                        paddingRight: (
                            0 + 
                            3 * !this.props.noDropdownIcon +
                            2 * !this.props.noClearIcon
                        ) * theme.spacing.unit
                    }}
                    endAdornment={
                        <>
                            {!this.props.noClearIcon && (this.props.value || this.props.searchValue) && (
                                <CloseIcon
                                    className={classes.clearIcon}
                                    onClick={this.clearIconClickHandler}
                                />
                            )}
                            {!this.props.noDropdownIcon && (
                                <ArrowDropDownIcon
                                    className={classes.dropdownIcon}
                                    onClick={this.dropdownIconClickHandler}
                                />
                            )}
                        </>
                    }
                    className={cn(classes.input, this.props.inputClassName)}
                    {...this.props.inputProps}
                />
                <Popper
                    open={menuIsVisible}
                    anchorEl={this.anchorEl}
                    id={`search__${this.id}__popper`}
                    placement={(this.props.fixedWidth && this.props.popperAlign === 'right') ? 'bottom-end' : 'bottom-start'}
                    className={cn(classes.popper, this.props.popperClassName)}
                    style={{
                        minWidth: selectMinWidth,
                        width: this.props.fixedWidth
                    }}
                    transition
                >
                        {({ TransitionProps }) => (
                        <Grow {...TransitionProps} timeout={150}>
                            <Paper
                                elevation={8}
                                className={cn(
                                    classes.menuWrapper,
                                    { [classes.rightAligneMenu]: this.props.popperAlign === 'right' },
                                    { [classes.attachedMenu]: !this.props.floatingMenu },
                                    { [classes.floatingMenu]: this.props.floatingMenu }
                                )}
                            >
                                <RootRef rootRef={this.menuEl}>
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
    rightAligneMenu: { // class of menuWrapper (Paper)
        transformOrigin: [['right', 'top']],
    },
    attachedMenu: { // class of menuWrapper (Paper)
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
    },
    floatingMenu: { // class of menuWrapper (Paper)
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
        display: 'flex',
        justifyContent: 'space-between',
        marginLeft: 2 * theme.spacing.unit,
        marginRight: 2 * theme.spacing.unit,
        fontWeight: 300,
        borderBottom: [[1, 'solid', theme.palette.secondary.main]],
    },
    groupItems: {
        // paddingLeft: 1 * theme.spacing.unit,
        // paddingRight: 1 * theme.spacing.unit,
    },
    menuItem: {
        display: 'block',
        lineHeight: 1,
        height: 'auto'
    },
    activeMenuItem: {
        backgroundColor: 'rgba(0,0,0,0.1)',
    },
    secondaryLabel: {
        opacity: 0.5,
        fontSize: '0.75em',
        marginTop: 0.5 * theme.spacing.unit
    }
});


Search.propTypes = {
    // required props
    searchValue: PropTypes.string,
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
        seondary: PropTypes.string,
        group: PropTypes.string,
    })).isRequired,
    onSelect: PropTypes.func.isRequired,
    onInputChange: PropTypes.func.isRequired,
    
    label: PropTypes.string,
    placeholder: PropTypes.string,

    // modifiers
    inputClassName: PropTypes.string,
    inputProps: PropTypes.object,
    popperClassName: PropTypes.string,
    labelClassName: PropTypes.string,
    menuItemClassName: PropTypes.string,
    activeMenuItemClassName: PropTypes.string,

    noClearIcon: PropTypes.bool,
    noDropdownIcon: PropTypes.bool,
    floatingMenu: PropTypes.bool,
    maxHeight: PropTypes.string,
    popperAlign: PropTypes.oneOf(['left', 'right']),
    widthFactor: PropTypes.number,
    fixedWidth: PropTypes.string,

    className: PropTypes.string,
    style: PropTypes.object,
};

Search.defaultProps = {
    noClearIcon: false,
    noDropdownIcon: false,
    floatingMenu: false,
    maxHeight: null,
    popperAlign: 'left',
    widthFactor: 1,
};

export default (withStyles(styles, { withTheme: true })(Search));
