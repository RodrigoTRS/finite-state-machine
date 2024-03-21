import { main } from "./main.js"

try {
    
    // Modo da aplicação pode ser
    // -- "mocked" - para dados definidos estáticamente em "mocked-data.js"
    // -- "input" - para recebimento de input em "receive-input.js"
    main("input")

} catch(err){
    console.error(err)
}