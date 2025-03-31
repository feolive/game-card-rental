
const tryCatch = async (fn) => {
  try {
    let data = await fn();
    return [data, null];
  } catch (error) {
    return [null, error];
  }
};

export default tryCatch;