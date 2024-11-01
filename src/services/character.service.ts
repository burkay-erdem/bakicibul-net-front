import { IListQuery, IResponseInfo } from "../interface/global";
import { ICharacterSchema } from "../interface/character.interface";
import { apiSlice } from "../redux/api.slice";


export const CharacterEndpoints = {
    section: "api/character",
    graphql: "graphql",
};

interface IReadListResponse extends IResponseInfo {
    results: ICharacterSchema[]
}
export type ICharacterStatus = "all" | "alive" | "dead" | "unknown"
interface IReadRequest {
    characterId?: string,
}
interface IReadListRequest extends IListQuery {
    status: ICharacterStatus,

}
interface IReadFavoriteListRequest extends IListQuery {
    status?: ICharacterStatus,
    characterIds: number[]
}
export const CharacterApiServiceSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        characters: builder.query<IReadListResponse, Partial<IReadListRequest>>({
            query: (data) => ({
                url: CharacterEndpoints.section,
                method: "GET",
                params: data,
            }),
        }),
        character: builder.query<ICharacterSchema, IReadRequest>({
            query: (data) => ({
                url: `${CharacterEndpoints.section}/${data.characterId}`,
                method: "GET",
                params: data,
            }),
        }),
        favoriteCharacter: builder.query<ICharacterSchema[], IReadFavoriteListRequest>({
            query: (data) => ({
                url: `${CharacterEndpoints.section}/[${data.characterIds.join(',')}]`,
                method: "GET",
                params: data,
            }),
        }),

    }),
});

export const {
    useCharactersQuery,
    useCharacterQuery,
    useFavoriteCharacterQuery, 
} = CharacterApiServiceSlice;
