/**
 * Use the navigator API to get current coordinates, and then pass
 * those to the reverse geocode API to get human-friendly place
 * details for those coordinates
 */
const getUserLocation = () => (
  new Promise((resolve, reject) => {
    if (typeof navigator === 'undefined') reject(new Error('Navigator API not supported'));

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const result = await fetch(`/api/reverse-geocode?latlng=${latitude},${longitude}`);
          const location = await result.json();
          resolve(location);
        } catch (e) {
          reject('Error loading location');
        }
      },
      (error) => reject(error),
    );
  })
);

export default getUserLocation;
