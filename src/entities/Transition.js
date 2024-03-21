export class Transition {
    source
    token
    destination

    constructor(source, token, destination) {
        this.source = source
        this.token = token
        this.destination = destination
    }
}