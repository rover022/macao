import { DefaultMCTSFacade } from './mcts/mcts'
import { Controller } from './controller'
import {
  Playerwise,
  GenerateActions,
  ApplyAction,
  StateIsTerminal,
  CalculateReward
} from './entities'

/**
 * The `Macao` class represents a Monte Carlo tree search that can be easily
 * created. It provides, through it's [[getAction]] method, the results of running
 * the algorithm.
 *
 * ```javascript
 * const funcs = {
 *   generateActions,
 *   applyAction,
 *   stateIsTerminal,
 *   calculateReward,
 * }
 *
 * const config = {
 *   duration: 100,
 *   explorationParam: 1.414
 * }
 *
 * const macao = new Macao(funcs, config);
 *
 * const action = macao.getAction(state);
 * ```
 * @param State  Generic Type representing a game state object.
 * @param Action  Generic Type representing an action in the game.
 */
export class Macao<State extends Playerwise, Action> {
  /**
   * @hidden
   * @internal
   */
  private controller_: Controller<State, Action>

  /**
   * Creates an instance of Macao.
   *
   * ```javascript
   * const funcs = {
   *   generateActions,
   *   applyAction,
   *   stateIsTerminal,
   *   calculateReward,
   * }
   *
   * const config = {
   *   duration: 100,
   *   explorationParam: 1.414
   * }
   *
   * const macao = new Macao(funcs, config);
   * ```
   * @param {object} funcs - Contains all the functions implementing the game's rules.
   * @param {GenerateActions<State, Action>} funcs.generateActions
   * @param {ApplyAction<State, Action>} funcs.applyAction
   * @param {StateIsTerminal<State>} funcs.stateIsTerminal
   * @param {CalculateReward<State>} funcs.calculateReward
   * @param {object} config Configuration options
   * @param {number} config.duration Run time of the algorithm, in milliseconds.
   * @param {number | undefined} config.explorationParam The exploration parameter constant.
   * Used in [UCT](https://en.wikipedia.org/wiki/Monte_Carlo_tree_search). Defaults to 1.414.
   * @param {number | undefined} config.fpuParam The First play urgency parameter. Used to encourage
   * early exploitation. Defaults to `Infinity`.
   * See [Exploration exploitation in Go:
   * UCT for Monte-Carlo Go](https://hal.archives-ouvertes.fr/hal-00115330/document)
   * @param {number | undefined} config.decayingParam The multiplier by which to decay the rewarard
   * in the backpropagtion phase. Defaults to 1.
   * @param {number | undefined} config.transpoTable The number of buckets in the Transoposition Hash Table.
   */
  constructor(
    funcs: {
      generateActions: GenerateActions<State, Action>
      applyAction: ApplyAction<State, Action>
      stateIsTerminal: StateIsTerminal<State>
      calculateReward: CalculateReward<State>
    },
    config: {
      duration: number
      explorationParam?: number
      fpuParam?: number
      decayingParam?: number
      /**
       * The number of buckets in the Transposition Hash table
       */
      transpoTable?: number
    }
  ) {
    this.controller_ = new Controller(funcs, config)
  }
  /**
   * Runs the Monte Carlo Tree search algorithm and returns the estimated
   * best action given the current state of the game.
   *
   * ```javascript
   * const action = macao.getAction(state);
   * ```
   * @param {State} state  Object representing the game state.
   * @param {number | undefined} duration  Run time of the algorithm, in milliseconds.
   * @returns {Action}
   */
  getAction(state: State, duration?: number): Action {
    return this.controller_.getAction(state, duration)
  }
}
