import { input } from "../utils/reader.js";

export async function receiveInput() {
    console.log("\n\n------ RECEBIMENTO DOS INPUTS ------\n\n")

    const states = await input("\nDefina o número de estados: \n")
    if ((states > 10) || (states < 1)) throw new OutOfRangeError()
    
    const tokens = await input("\nDefina os tokens terminais\n(Primeiro o número de tokens, seguidos dos tokens separados por espaço. i.e.: '3 a b c'): \n")
    
    const acceptanceStates = await input("\nDefina o número estados de aceitação:\n(Primeiro o número de estados, seguidos dos estados separados por espaço. i.e.: '3 1 2 3'): \n")
    
    let transitions = []
    const numberOfTransitions = Number(await input("\nDefina o número de transições: \n"))
    for (let i = 0; i < numberOfTransitions; i++) {
        let transition = await input(`\nTransição ${i}:\n(Estado inicial, token, estado final da transição. i.e.: '1 a 2') \n`)
        transitions.push(transition)
    }
        
    return {
        states,
        tokens,
        acceptanceStates,
        transitions
    }
}