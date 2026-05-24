import { useEffect } from 'react';

const usePageTitle = (title) => {
  useEffect(() => {
    document.title = title
      ? `${title} | SupplyPulse`
      : 'SupplyPulse | Supply Chain Intelligence';
  }, [title]);
};

export default usePageTitle;