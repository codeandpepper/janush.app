export const handleError = (
  err: unknown,
  callback: (err: Error) => void = console.error
): void => {
  if (err instanceof Error) {
    callback(err);
  }
};
