import { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import MonthlyChecks from './components/MonthlyChecks';
import Tracking from './components/Tracking';
import CalendarView from './components/CalendarView';
import Analytics from './components/Analytics';
import HomeManual from './components/HomeManual';
import Notifications from './components/Notifications';
import Settings from './components/Settings';

function App() {
  const [activeView, setActiveView] = useState('dashboard');

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard setActiveView={setActiveView} />;
      case 'monthly':
        return <MonthlyChecks />;
      case 'tracking':
        return <Tracking />;
      case 'calendar':
        return <CalendarView />;
      case 'analytics':
        return <Analytics />;
      case 'manual':
        return <HomeManual />;
      case 'notifications':
        return <Notifications />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard setActiveView={setActiveView} />;
    }
  };

  return (
    <Layout activeView={activeView} setActiveView={setActiveView}>
      {renderView()}
    </Layout>
  );
}

export default App;
