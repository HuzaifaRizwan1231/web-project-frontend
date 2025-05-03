export const getParsedErrors = (result) => {
  const fieldErrors = {};
  result.error.errors.forEach((err) => {
    fieldErrors[err.path[0]] = err.message;
  });
  return fieldErrors;
};
