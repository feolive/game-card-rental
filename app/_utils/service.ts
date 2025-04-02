import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";


/**
 * Handle the GET request
 * @param fn A function that takes a database connection and returns a promise
 * @returns json response
 */
export async function doGET(fn: (_db: PostgresJsDatabase) => Promise<any>) {
    const result = await fn(db);
    return NextResponse.json(result);
}


/**
 * Handle the POST request
 * @param fn A function that takes a database connection and returns a promise
 * @returns json response
 */
export async function doPOST(fn: (_db: any) => Promise<any>) {
    const result = await db.transaction(async (_db) => {
        const result = await fn(_db);
        return result;
    });
    return NextResponse.json(result);
}

/**
 * Handle the PUT request
 * @param fn A function that takes a database connection and returns a promise
 * @returns json response
 */
export async function doPUT(fn: (_db: any) => Promise<any>) {
    const result = await db.transaction(async (_db) => {
        const result = await fn(_db);
        return result;
    });
    return NextResponse.json(result);
}

/**
 * Handle the DELETE request
 * @param fn A function that takes a database connection and returns a promise
 * @returns json response
 */
export async function doDELETE(fn: (_db: any) => Promise<any>) {
    const result = await db.transaction(async (_db) => {
        const result = await fn(_db);
        return result;
    });
    return NextResponse.json(result);
}


export function getQueryParams(req: NextRequest, keys: string[]) {
    const params = req.nextUrl.searchParams;
    const result = {};
    for (const key of keys) {
        result[key] = params.get(key);
    }
    return result;
}

/**
 * Get the request body
 * @param req NextRequest
 * @returns 
 */
export function getRequestBody(req: NextRequest): any {
    return req.json();
}