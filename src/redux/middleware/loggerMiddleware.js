// import apiRequest from '../../helper/apiRequest';

const loggerMiddleware = (store) => (next) => (action) => {
    // console.groupCollapsed(action.type);
    console.log(`%c[ACTION] ${action.type}`, 'font-weight: bold');
    // console.log(`[${action.type}] prevState:`, store.getState());
    // console.log(`[${action.type}] action:`, action)
    const result = next(action);
    // console.log(`[${action.type}] nextState:`, store.getState());
    // console.groupEnd();
    
    return result;
}

export default loggerMiddleware;
