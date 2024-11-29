Object.defineProperty(global, 'import.meta', {
  value: {
    env: {
      VITE_API_URL: 'https://dummyjson.com',
    },
  },
});
