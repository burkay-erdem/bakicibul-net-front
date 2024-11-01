interface IUseCreateQueryString {
    createQueryString: (name: string, value: string,args?: string[] ) => string
}
export const useCreateQueryString = (): IUseCreateQueryString => {
    const createQueryString = (name: string, value: string, args?: string[] ) => {
        const params = new URLSearchParams(location.search);
        params.set(name, value);
        
        if(args) {
            for (const arg of args) {
                params.delete(arg)
            }
        }
        return params.toString();
    };
    return {
        createQueryString
    }

};