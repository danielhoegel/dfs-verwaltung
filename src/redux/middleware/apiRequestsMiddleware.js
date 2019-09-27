import apiRequest from '../../helper/apiRequest';

const successSuffix = '_SUCCESS';
const failureSuffix = '_FAILURE';

const apiRequestMiddleware = (store) => (next) => (action) => {
    if (action.request && action.request.url) {
        const { url, ...options } = action.request;

        apiRequest(url, options)
            .then(res => {
                console.log(`%c[REQUEST SUCCESS] ${action.type}`, 'color: darkgreen', res);
                store.dispatch({
                    type: action.type + successSuffix,
                    data: res,
                    request: action
                });
                if (typeof action.resolve === 'function') {
                    action.resolve(res);
                }
            })
            .catch(err => {
                console.log(`%c[REQUEST FAILURE] ${action.type}`, 'color: darkred', err);
                store.dispatch({
                    type: action.type + failureSuffix,
                    error: err,
                    request: action
                });
                if (typeof action.reject === 'function') {
                    action.reject(err);
                }
            });
    }
    return next(action);
};

export default apiRequestMiddleware;
