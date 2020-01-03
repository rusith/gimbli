import {mapMocks} from "../../utils/mocking";

let getTemplateFileOfFolderMock: any = () => null;
let isTemplateFolderPresentMock: any = () => null;

export const setMockFn = mapMocks([
    [getTemplateFileOfFolder, (f) => { getTemplateFileOfFolderMock = f; }],
    [isTemplateFolderPresent, (f) => { isTemplateFolderPresentMock = f; }],
]);

export async function getTemplateFileOfFolder(...args) {
    return getTemplateFileOfFolderMock(...args);
}

export async function isTemplateFolderPresent(...args) {
    return isTemplateFolderPresentMock(...args);
}
