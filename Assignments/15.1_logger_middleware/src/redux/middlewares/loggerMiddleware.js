// create and export middleware function here

export const loggerMiddleware = (store) => {
    return function (next) {
      return function (action) {
        console.log("[LOG]: " + action.type + " " + new Date().toString()); // log action
        next(action); // call next middleware in the pipeline
        console.log("store", store.getState()); // log modified state of app
      };
    };
  };
  