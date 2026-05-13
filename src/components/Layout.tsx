
import React, { ReactNode } from 'react';
import { LocationProvider } from '@/context/LocationContext';
import { ChatProvider } from '@/context/ChatContext';
import { LogisticsProvider } from '@/context/LogisticsContext';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <LocationProvider>
      <ChatProvider>
        <LogisticsProvider>
          <div className="min-h-screen">
            {children}
          </div>
        </LogisticsProvider>
      </ChatProvider>
    </LocationProvider>
  );
};

export default Layout;
