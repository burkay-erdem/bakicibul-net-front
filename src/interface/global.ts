import React from "react";

export interface IChildren {
    children?: React.ReactNode;
}

export interface IListQuery {
    page?: number;
    limit?: number;
}
export interface IResponseInfo {
    info: {
        count: number;
        pages: number;
        next: string | null;
        prev: string | null;
    },
}