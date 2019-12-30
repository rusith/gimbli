import {IRegexMatch} from "./models/IRegexMatch";

export function matchMultiple(exp: RegExp, text: string): IRegexMatch[] {
    const expression = new RegExp(exp, "g");
    let match: RegExpExecArray;
    const matches: RegExpExecArray[] = [];

    // tslint:disable-next-line:no-conditional-assignment
    while ((match = expression.exec(text))) {
        matches.push(match);
    }

    return matches.map((m) => {
        return {
            content: m[0],
            end: m.index + m[0].length,
            groups: m.slice(1),
            start: m.index,
        };
    });
}

export function replace(text: string, target: string, substitute: string): string {
    return text.split(target).join(substitute);
}
