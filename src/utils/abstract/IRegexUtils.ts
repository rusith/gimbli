import {IRegexMatch} from "..";

export interface IRegexUtils {
    matchMultiple(exp: RegExp, text: string): IRegexMatch[];
}
