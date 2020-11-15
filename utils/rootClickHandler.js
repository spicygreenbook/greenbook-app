/**
 * Allow components to register click handlers on the root component,
 * similar to how you would add a click handler to the document
 * in a web project
 */
const handlers = [];

export const addRootClickHandler = (handler) => {
  handlers.push(handler);
};

export const removeRootClickHandler = (handler) => {
  const handlerIndex = handlers.indexOf(handler);
  if (handlerIndex === -1) return;
  handlers.splice(handlers.indexOf(handler), 1);
};

export const handleRootClick = (e) => {
  for (let handler of handlers) {
    handler(e);
  }
};
