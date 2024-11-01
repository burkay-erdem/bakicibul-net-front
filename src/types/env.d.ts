declare global {
    namespace NodeJS {
        interface ProcessEnv {
            REACT_APP_MORTI_API: string
        }
    }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export { }