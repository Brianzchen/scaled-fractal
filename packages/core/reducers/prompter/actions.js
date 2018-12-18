import { testingService } from '@core/service';

export const getStuff = () => (
  (dispatch) => {
    dispatch(testingService.getStuff()).then((res) => {
      alert('The answer is in the console');
      console.info(`the server responsed with ${res}`);
    });
  }
);
