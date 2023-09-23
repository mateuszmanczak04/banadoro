class CustomError extends Error {
  status?: number;
  constructor(public message: string, public statusCode?: number) {
    super(message);
    if (statusCode) this.status = statusCode;
  }
}

export default CustomError;
