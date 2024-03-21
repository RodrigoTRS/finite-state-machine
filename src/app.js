import { main } from "./main.js"
import process from "process"

try {

    // Modo da aplicação pode ser
    // -- "input" - para recebimento de input em "receive-input.js" (DEFAULT)
    // -- "mocked" - para dados definidos estáticamente em "mocked-data.js"

    const mode = process.argv[2]
    if (mode === "--mocked") {
        main("mocked")
    } else {
        main()
    }

} catch(err){
    console.error(err)
}