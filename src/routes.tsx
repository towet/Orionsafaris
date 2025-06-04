import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Explore from './pages/Explore';
import MigrationSafari from './pages/MigrationSafari';
import ClassicKenyaTanzania from './pages/ClassicKenyaTanzania';
import PrivateLuxurySafariV2 from './pages/PrivateLuxurySafariV2';
import GroupSafariAdventure from './pages/GroupSafariAdventure';
import SerengetiNgorongoroSafari from './pages/studentpackage';
import DayToursV2 from './pages/DayToursV2';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/explore',
    element: <Explore />,
  },
  {
    path: '/migration-safari',
    element: <MigrationSafari />,
  },
  {
    path: '/classic-kenya-tanzania',
    element: <ClassicKenyaTanzania />,
  },
  {
    path: '/private-luxury-safari',
    element: <PrivateLuxurySafariV2 />,
  },
  {
    path: '/group-safari-adventure',
    element: <GroupSafariAdventure />,
  },
  {
    path: '/serengeti-ngorongoro-safari',
    element: <SerengetiNgorongoroSafari />,
  },
  {
    path: '/day-tours',
    element: <DayToursV2 />,
  },
]);
