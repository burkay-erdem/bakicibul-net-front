import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


console.log('process.env.NEXT_PUBLIC_MORTI_API: ', process.env.NEXT_PUBLIC_MORTI_API);
export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_MORTI_API,
        // credentials: "include",
        prepareHeaders: (headers, { endpoint, extra, type, getState }) => {
            if (!headers.has("Content-Type")) {
                headers.set("Content-Type", "application/json");
            }
            return headers;
        },
    }),


    tagTypes: [
        "Locations"
    ],

    endpoints: (builder) => ({
        // omitted
    }),
});
