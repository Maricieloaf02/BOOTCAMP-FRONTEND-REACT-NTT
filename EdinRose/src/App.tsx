import React from 'react';
import ShopPage from '@/pages/ShopPage';
import ErrorModal from '@/shared/components/ErrorModal';

const App: React.FC = () => {
  return (
    <div>
      <ErrorModal />
      <ShopPage />
    </div>
  );
};

export default App;
