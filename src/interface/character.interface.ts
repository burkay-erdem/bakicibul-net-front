export interface ICharacterSchema {
    id: number;
    name: string;
    status: string;
    indicator: string;
    species: string;
    type: string;
    gender:string;
    origin: {
        name: string;
        url: string;
    }
}