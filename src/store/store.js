import { proxydi } from '@deip/proxydi';

const GETTERS = {
  defaultAsset: (state) => state.assets.data
    .find((asset) => asset.symbol === proxydi.get('env').CORE_ASSET.symbol),
  team: (state) => {
    const currentUser = state.currentUser.data;
    if (!currentUser) return null;
    return state.teams.data.find((team) => team._id === currentUser.teams[0]);
  },
  project: (state) => {
    const currentUser = state.currentUser.data;
    if (!currentUser) return null;
    return state.projects.data.find((project) => project.teamId === currentUser.teams[0]);
  }
};

const ACTIONS = {
  getCurrentUserProject({ rootGetters, dispatch }) {
    const currentUser = rootGetters['currentUser/data'];

    if (currentUser) {
      dispatch('projects/getTeamProjects', { teamId: currentUser.teams[0] }, { root: true });
    }
  }
};

export const store = {
  getters: GETTERS,
  actions: ACTIONS
};
