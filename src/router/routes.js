
const routes = [
  {
    path: '/',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Login.vue') }
    ]
  },
  {
    path: '/matches',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/match/Matches.vue') }
    ]
  },
  {
    path: '/match/:id',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/match/Match.vue') }
    ]
  },
  {
    path: '/match/:id/events',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/match/MatchEvents.vue') }
    ]
  },
  {
    path: '/closedMatches',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/match/ClosedMatches.vue') }
    ]
  },
  {
    path: '/closedMatch/:id',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/match/ClosedMatch.vue') }
    ]
  },
  {
    path: '/players',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/player/Players.vue') }
    ]
  },
  {
    path: '/addPlayer',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/player/AddPlayer.vue') }
    ]
  },
  {
    path: '/editPlayer/:id',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/player/EditPlayer.vue') }
    ]
  },
  {
    path: '/managers',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/manager/Managers.vue') }
    ]
  },
  {
    path: '/addManager',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/manager/AddManager.vue') }
    ]
  },
  {
    path: '/editManager/:id',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/manager/EditManager.vue') }
    ]
  },
  {
    path: '/referees',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/referee/Referees.vue') }
    ]
  },
  {
    path: '/addReferee',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/referee/AddReferee.vue') }
    ]
  },
  {
    path: '/editReferee/:id',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/referee/EditReferee.vue') }
    ]
  },
  {
    path: '/clubs',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/club/Clubs.vue') }
    ]
  },
  {
    path: '/addClub',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/club/AddClub.vue') }
    ]
  },
  {
    path: '/editClub/:id',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/club/EditClub.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
