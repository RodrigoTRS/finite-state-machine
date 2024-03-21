import { Transition } from "./Transition.js"
import { mockedData } from "../test/mocked-data.js";
import { receiveInput } from "../test/receive-input.js";

export class Automaton {
    mode
    states
    tokens
    acceptanceStates
    transitions
    type
    
    constructor({ mode, states, tokens, acceptanceStates, transitions }) {
        this.mode = mode === "mocked" ? "mocked" : "input"
        this.states = this.generateStateArray(states)
        this.tokens = this.generateTokensArray(tokens)
        this.acceptanceStates = this.generateAcceptaceStatesArray(acceptanceStates)
        this.transitions = this.generateTransitionsArray(transitions)
        this.type = this.isDeterministic() ? "AFD" : "AFN"
    }

    static async create(mode) {
        if(mode === "mocked") { // Se o mode da aplicação estiver em "mocked", recebe os dados de mocked-data.js
            const { states, tokens, acceptanceStates, transitions } = mockedData
            return new Automaton({ mode, states, tokens, acceptanceStates, transitions })
        } else { // Se não, recebe os dados de receive-input.js
            const { states, tokens, acceptanceStates, transitions } = await receiveInput()
            return new Automaton({ mode, states, tokens, acceptanceStates, transitions })
        }
    }

    
    isDeterministic() {
        let transitionsValidator = []
        
        const isValidTransitionArray = this.transitions.map((transition) => {
            let sourceAndToken = String(transition.source) + transition.token
            if (transitionsValidator.includes(sourceAndToken)) {
                return false
            } else {
                transitionsValidator.push(sourceAndToken)
                return true
            }
        })
        
        if (isValidTransitionArray.includes(false)) {
            return false
        } else {
            return true
        }
    }
    
    generateStateArray(states) {
        let statesArray = []
        
        for (let i = 0; i<states; i++) {
            statesArray.push(i)
        }
        
        return statesArray
    }
    
    generateTokensArray(tokens) {
        return tokens.split(" ").splice(1)
    }
    
    generateAcceptaceStatesArray(acceptanceStates) {
        let numberArray = []
        const stringArray = acceptanceStates.split(" ").splice(1)
        stringArray.map((item) => {
            numberArray.push(Number(item))
        })
        return numberArray
    }
    
    generateTransitionsArray(transitions) {
        let transitionsArray = []
        transitions.map((transition) => {
            transitionsArray.push(Transition.create(transition))
        })
        return transitionsArray
    }
    
    execute(entrance) {
        let currentState = this.states[0]
        
        for (let i = 0; i < entrance.length; i++) {
            currentState = this.process(currentState, entrance[i])
        }
        
        if (this.acceptanceStates.includes(currentState)) {
            return true
        } else {
            return false
        }
    }

    process(state, token) {
        // Se receber cadeia vazia, retorna o estado atual (se o estado inicial for de aceitação, a funcção de execução retorna true)
        if (token === "-") {
            return state
        }
        
        const transitionsFromThisState = this.transitions.filter((transitions) => {
            return transitions.source === state
        })
        
        // Not accepted if no transitions from current state
        if (!transitionsFromThisState) return -1
        
        const transitionsThatProcessCurrentToken = transitionsFromThisState.filter((transitions) => {
            return transitions.token === token
        })
        
        // Not accepted if token cant be processed from current state
        if (!transitionsThatProcessCurrentToken) return -1 
        
        return transitionsThatProcessCurrentToken[0].destination
    } 
}