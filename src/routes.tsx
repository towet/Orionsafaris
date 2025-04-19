import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Explore from './pages/Explore';
import MigrationSafari from './pages/MigrationSafari';
import ClassicKenyaTanzania from './pages/ClassicKenyaTanzania';
import PrivateLuxurySafari from './pages/PrivateLuxurySafari';
import GroupSafariAdventure from './pages/GroupSafariAdventure';
import SerengetiNgorongoroSafari from './pages/SerengetiNgorongoroSafari';
import DayTours from './pages/DayTours';

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
    element: <PrivateLuxurySafari />,
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
    element: <DayTours />,
  },
]);
