export const getUserAction = async () => {
  try {
    return {
      user: '',
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};
