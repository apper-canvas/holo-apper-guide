import Home from '../pages/Home'
import Tutorial from '../pages/Tutorial'
import Playground from '../pages/Playground'
import Examples from '../pages/Examples'
import Progress from '../pages/Progress'
import Resources from '../pages/Resources'

export const routes = {
  home: {
    id: 'home',
    label: 'Introduction',
    path: '/home',
    icon: 'Home',
    component: Home
  },
  tutorial: {
    id: 'tutorial',
    label: 'Tutorial',
    path: '/tutorial',
    icon: 'BookOpen',
    component: Tutorial
  },
  playground: {
    id: 'playground',
    label: 'Playground',
    path: '/playground',
    icon: 'Code',
    component: Playground
  },
  examples: {
    id: 'examples',
    label: 'Examples',
    path: '/examples',
    icon: 'Grid3x3',
    component: Examples
  },
  progress: {
    id: 'progress',
    label: 'Progress',
    path: '/progress',
    icon: 'Trophy',
    component: Progress
  },
  resources: {
    id: 'resources',
    label: 'Resources',
    path: '/resources',
    icon: 'BookMarked',
    component: Resources
  }
}

export const routeArray = Object.values(routes)