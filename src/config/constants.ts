export const templateDirectoryPath = "./templates";
export const specialArguments = {
    templateDir: "templateDir",
    isOne(arg: string) {
        return Object.values(this)
            .indexOf(arg) > -1;
    },
};
