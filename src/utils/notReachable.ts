export const notReachable = (_: never): never => {
  console.error(_);
  throw new Error(`Not reachable state appeared: ${JSON.stringify(_)}`);
};

export const notImplemented = (context?: string): never => {
  throw new Error(`Not implemented: ${context}`);
};
