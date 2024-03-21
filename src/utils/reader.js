import * as readline from "node:readline"

export const reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

export function input(question) {
    return new Promise((resolve) => {
        reader.question(String(question), (input) => {
            resolve(input);
        });
    });
}