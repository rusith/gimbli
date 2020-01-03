export function mapMocks(mappings: Array<[any, any]>) {
    return (fn: any, mock: any) => {
        const item = mappings.
            find(([f]) => f === fn);
        if (item) {
            item[1](mock);
        }
    };
}
