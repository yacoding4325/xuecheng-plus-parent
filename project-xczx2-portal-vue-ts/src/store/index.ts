import Vue from 'vue'
import Vuex from 'vuex'
import { ISystemState } from './modules/system'
import { IUserState } from './modules/user'

Vue.use(Vuex)

export interface IRootState {
  system: ISystemState
  user: IUserState
}

export default new Vuex.Store<IRootState>({})
