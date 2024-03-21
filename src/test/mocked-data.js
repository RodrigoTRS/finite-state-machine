// // ----- AFD
//

// const states = 3
// const tokens = "2 a b"
// const acceptanceStates = "1 2"

// let transitions = []

// transitions.push("0 a 1")
// transitions.push("0 b 1")
// transitions.push("1 a 1")
// transitions.push("1 b 2")
// transitions.push("2 a 0")
// transitions.push("2 b 2")

// // ----- AFN
//

const states = 3
const tokens = "2 a b"
const acceptanceStates = "1 2"

let transitions = []

transitions.push("0 b 0")
transitions.push("0 a 1")
transitions.push("0 b 1")
transitions.push("0 a 2")
transitions.push("1 a 2")
transitions.push("2 a 2")
transitions.push("2 b 2")

export const mockedData = {
    states,
    tokens,
    acceptanceStates,
    transitions
}