const emailToUsernameMap: Record<string, string> = {
    'michael.williams@x.dummyjson.com': 'michaelw',
    'emily.johnson@x.dummyjson.com': 'emilys',
    'sophia.brown@x.dummyjson.com': 'sophiab',
    'james.davis@x.dummyjson.com': 'jamesd',
    'emma.miller@x.dummyjson.com': 'emmaj',
    'olivia.wilson@x.dummyjson.com': 'oliviaw',
    'alexander.jones@x.dummyjson.com': 'alexanderj',
    'ava.taylor@x.dummyjson.com': 'avat',
  };
  
  export const getUsernameByEmail = (email: string): string | undefined => {
    return emailToUsernameMap[email];
  };
  