class UnhandleError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UnhandleError';
    this.statusCode = 500;
  }
}

export const UNHANDLE_ERROR = new UnhandleError();
