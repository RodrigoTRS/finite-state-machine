import { Transition } from "./Transition.js"

export class Automaton {
    states
    tokens
    acceptance_states
    transitions = []
    

    constructor({ states, tokens, acceptance_states }) {
        this.states = this.generateStateArray(states)
        this.tokens = this.generateTokensArray(tokens)
        this.acceptance_states = this.generateAcceptaceStatesArray(acceptance_states)
    }

    execute(entrance) {
        let currentState = this.states[0]
        console.log(currentState)


        for (let i = 0; i < entrance.length; i++) {
            currentState = this.process(currentState, entrance[i])
            console.log(currentState)
        }

        if (this.acceptance_states.includes(currentState)) {
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

    generateAcceptaceStatesArray(acceptance_states) {
        let numberArray = []
        const stringArray = acceptance_states.split(" ").splice(1)
        stringArray.map((item) => {
            numberArray.push(Number(item))
        })
        return numberArray
    }

    addTransition(transition) {
        let newTransition = new Transition(Number(transition[0]), transition[2], Number(transition[4]))
        this.transitions.push(newTransition)
    }
}