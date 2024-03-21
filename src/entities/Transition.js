export class Transition {
    source
    token
    destination

    constructor(source, token, destination) {
        this.source = source
        this.token = token
        this.destination = destination
    }

    static create(transitionString) {
        const transitionArray = transitionString.split("")
        const newTransition = new Transition(transitionArray[0], transitionArray[2], transitionArray[4])
        return newTransition
    }
}