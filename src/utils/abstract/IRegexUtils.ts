import {IRegexMatch} from "..";

export interface IRegexUtils {
    matchMultiple(exp: RegExp, text: string): IRegexMatch[];
    replace?(text: string, target: string, substitute: string): string;
}
