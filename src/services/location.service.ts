import { IListQuery, IResponseInfo } from "../interface/global";
import { ILocationSchema } from "../interface/location.interface";
import { apiSlice } from "../redux/api.slice";


export const LocationEndpoints = {
    section: "api/location",

};

interface IReadListResponse extends IResponseInfo {
    results: ILocationSchema[]
}
export const LocationApiServiceSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        Location: builder.query<IReadListResponse, IListQuery>({
            query: (data) => ({
                url: LocationEndpoints.section,
                method: "GET",
                params: data,
            }),
        }),

    }),
});


export const {
    useLocationQuery
} = LocationApiServiceSlice;
