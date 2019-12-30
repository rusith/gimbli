let getTemplateFileOfFolderMock: any = () => null;
let isTemplateFolderPresentMock: any = () => null;

export function setMockFn(fn: any, mock: any) {
    if (fn === getTemplateFileOfFolder) {
        getTemplateFileOfFolderMock = mock;
    } else if (fn === isTemplateFolderPresent) {
        isTemplateFolderPresentMock = mock;
    }
}

export async function getTemplateFileOfFolder(...args) {
    return getTemplateFileOfFolderMock(...args);
}

export async function isTemplateFolderPresent(...args) {
    return isTemplateFolderPresentMock(...args);
}
