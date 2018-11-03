export const getStuff = () => (
  (dispatch, getState, { testingService }) => {
    testingService.getStuff().then((res) => {
      alert('The answer is in the console');
      console.info(`the server responsed with ${res}`);
    });
  }
);
