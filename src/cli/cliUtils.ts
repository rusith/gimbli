import * as readline from "readline";

export function getRelevantArguments(args: string[]): string[] {
    if (args == null) { return []; }
    return args.slice(2);
}

export async function getConfirmation(question: string): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
        if (!question) {
            return resolve(false);
        }

        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        rl.question(question, (answer) => {
            const firstLetter =  answer[0];
            resolve(firstLetter.toLowerCase() === "y");
        });

        rl.on("SIGINT", () => resolve(false));
    });
}

export function getColoredText(text: string, color): [string, string] {
    if (color) {
        return [`${color}%s${colors.reset}`, text];
    } else {
        return ["%s", text];
    }
}

export const colors = {
    fgGreen: "\x1b[32m",
    fgRed: "\x1b[31m",
    fgYellow: "\x1b[33m",
    reset: "\x1b[0m",
};
