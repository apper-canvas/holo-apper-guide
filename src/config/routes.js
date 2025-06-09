import HomePage from '@/components/pages/HomePage';
import TutorialPage from '@/components/pages/TutorialPage';
import PlaygroundPage from '@/components/pages/PlaygroundPage';
import ExamplesPage from '@/components/pages/ExamplesPage';
import ProgressPage from '@/components/pages/ProgressPage';
import ResourcesPage from '@/components/pages/ResourcesPage';

export const routes = {
  home: {
    id: 'home',
    label: 'Introduction',
    path: '/home',
    icon: 'Home',
component: HomePage
  },
  tutorial: {
    id: 'tutorial',
    label: 'Tutorial',
    path: '/tutorial',
    icon: 'BookOpen',
component: TutorialPage
  },
  playground: {
    id: 'playground',
    label: 'Playground',
    path: '/playground',
    icon: 'Code',
component: PlaygroundPage
  },
  examples: {
    id: 'examples',
    label: 'Examples',
    path: '/examples',
    icon: 'Grid3x3',
component: ExamplesPage
  },
  progress: {
    id: 'progress',
    label: 'Progress',
    path: '/progress',
    icon: 'Trophy',
component: ProgressPage
  },
  resources: {
    id: 'resources',
    label: 'Resources',
    path: '/resources',
    icon: 'BookMarked',
component: ResourcesPage
  }
}

export const routeArray = Object.values(routes)