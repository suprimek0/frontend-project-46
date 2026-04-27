
const json = (differences) => {
  try {
    return JSON.stringify(differences, null, 2);
  } catch (error) {
    throw new Error('Failed to format as JSON', { cause: error });
  }
};

export default json;