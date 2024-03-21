import { input, reader } from "./utils/reader.js";
import { Automaton } from "./entities/Automaton.js"

async function main() {

    console.log("\n\n------ RECEBIMENTO DOS INPUTS ------\n\n")
    // const number_of_states = await input("\nDefina o número de estados: \n")
    // if ((number_of_states > 10) || (number_of_states < 1)) throw new OutOfRangeError()

    // const tokens = await input("\nDefina os tokens terminais\n(Primeiro o número de tokens, seguidos dos tokens separados por espaço. i.e.: '3 a b c'): \n")
    // const acceptance_states = await input("\nDefina o número estados de aceitação:\n(Primeiro o número de estados, seguidos dos estados separados por espaço. i.e.: '3 1 2 3'): \n")
    // const number_of_transitions = Number(await input("\nDefina o número de transições: \n"))

    const number_of_states = 3
    const tokens = "2 a b"
    const acceptance_states = "1 2"
    const number_of_transitions = 6


    const automaton = new Automaton({
        states: number_of_states,
        tokens,
        acceptance_states,
    })

    // for (let i = 0; i < number_of_transitions; i++) {
    //     let transition = await input(`\nTransição ${i}:\n(Estado inicial, token, estado final da transição. i.e.: '1 a 2') \n`)
    //     automaton.addTransition(transition)
    // }

    automaton.addTransition("0 a 1")
    automaton.addTransition("0 b 1")
    automaton.addTransition("1 a 1")
    automaton.addTransition("1 b 2")
    automaton.addTransition("2 a 0")
    automaton.addTransition("2 b 2")


    // const number_of_entrances = await input("\nDefina o número de cadeias de entrada para o automato: \n")
    const number_of_entrances = 10

    console.log(automaton)
    
    let output = []

    for (let i = 1; i <= number_of_entrances; i++) {
        let entrance = await input(`\nCadeia de entrada ${i}: \n`)
        if (automaton.execute(entrance)) {
            output.push("aceita")
        } else {
            output.push("rejeita")
        }
    }


    console.log("\n\n------ RESPOSTA ------\n\n")
    output.forEach((line) => console.log(line))
    reader.close()
}

try {
    main()
} catch(err){
    console.error(err)
}
