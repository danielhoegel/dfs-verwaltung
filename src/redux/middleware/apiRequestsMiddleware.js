import apiRequest from '../../helper/apiRequest';

const successSuffix = '_SUCCESS';
const failureSuffix = '_FAILURE';

const apiRequestMiddleware = (store) => (next) => (action) => {
    if (action.request && action.request.url) {
        const { url, ...options } = action.request;

        apiRequest(url, options)
            .then(res => {
                store.dispatch({
                    type: action.type + successSuffix,
                    data: res,
                    request: action
                });
            })
            .catch(err => {
                store.dispatch({
                    type: action.type + failureSuffix,
                    error: err,
                    request: action
                });
            });
    }
    
    return next(action);
}

export default apiRequestMiddleware;