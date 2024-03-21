import { input, reader } from "./utils/reader.js";
import { Automaton } from "./entities/Automaton.js"

export async function main(appMode) {

    const mode = appMode === "mocked" ? "mocked" : "input"
    const automaton = await Automaton.create(mode)

    console.log(automaton)
 
    let output = []

    const numberOfEntrances = mode === "mocked"
        ? 10
        : await input("\nDefina o número de cadeias de entrada para o automato: \n")

    for (let i = 1; i <= numberOfEntrances; i++) {
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
