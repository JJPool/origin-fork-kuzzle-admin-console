import Vue from 'vue'
import {
  ADD_ENVIRONMENT,
  UPDATE_ENVIRONMENT,
  DELETE_ENVIRONMENT,
  CONNECT_TO_ENVIRONMENT
} from './mutation-types'
import { RESET } from '../../../mutation-types'

const state = {
  environments: {},
  connectedTo: null
}

export const mutations = {
  [ADD_ENVIRONMENT] (state, id, environment) {
    if (Object.keys(state.environments).indexOf(id) !== -1) {
      throw new Error(`Unable to add new environment to already existing id "${id}"`)
    }
    Vue.set(state.environments, id, environment)
  },
  [UPDATE_ENVIRONMENT] (state, id, environment) {
    if (Object.keys(state.environments).indexOf(id) === -1) {
      throw new Error(`The given id ${id} does not correspond to any existing
        environment.`)
    }
    state.environments[id] = environment
  },
  [DELETE_ENVIRONMENT] (state, id) {
    if (Object.keys(state.environments).indexOf(id) !== -1) {
      return
    }
    Vue.delete(state.environments, id)
  },
  [CONNECT_TO_ENVIRONMENT] (state, id) {
    if (id === null) {
      throw new Error('Cannot connect to a null environment. To reset connection, use the RESET mutation.')
    }
    if (Object.keys(state.environments).indexOf(id) === -1) {
      throw new Error(`The given id ${id} does not correspond to any existing
        environment.`)
    }
    state.connectedTo = id
  },
  [RESET] (state) {
    state.connectedTo = null
  }
}

export default {
  state,
  mutations
}
