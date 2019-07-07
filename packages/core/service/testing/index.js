export const getStuff = () => (
  () => new Promise((resolve) => {
    resolve('just a test');
  })
);
