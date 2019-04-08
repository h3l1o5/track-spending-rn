export default () =>
  new Promise((resolve: (location: { latitude: number; longitude: number }) => void, reject) => {
    navigator.geolocation.getCurrentPosition(
      currentPosition => {
        resolve({ latitude: currentPosition.coords.latitude, longitude: currentPosition.coords.longitude });
      },
      error => {
        reject(error);
      }
    );
  });
