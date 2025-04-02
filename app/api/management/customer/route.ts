/**
 * Matching the "/api/management/customer" RESTful request
 * use GET, POST, PUT, DELETE methods as needed
 */
"use server";
import { NextRequest } from "next/server";
import { doGET, doPOST,getRequestBody } from "@/app/_utils/service";
import { eq } from "drizzle-orm";
import { customer } from "@/db/schema";


/**
 * Handle the GET request, GET request is used to retrieve items
 * @param req NextRequest
 * @returns 
 */
export async function GET(req: NextRequest) {
    // TODO: add your query code here as code example below, and then remove these two line comments. For more usecases, see https://orm.drizzle.team/docs/select
    // return await doGET(async (_db) => {
    //   const result = await _db.select({name: customer.firstName, description: customer.description}).from(customer).where(eq(customer.id, 1));
    //   return result;
    // });
}

/**
 * Handle the POST request, POST request is used to create a new item
 * @param req NextRequest
 * @returns 
 */
export async function POST(req: NextRequest) {
    // TODO: add your code that handles the POST request here, referencing the code example below, and then remove these two line comments. For more usecases, see https://orm.drizzle.team/docs/insert
    // return await doPOST(async (_db) => {
    //   const body = await getRequestBody(req);
    //   const res = await _db.insert(customer).values({
    //     firstName: body.firstName,
    //     lastName: body.lastName,
    //   });
    //   throw new Error("Customer insersion Error");
    //   return res;
    // });
}

/**
 * Handle the PUT request, PUT request is used to update an item
 * @param req NextRequest
 * @returns 
 */
export async function PUT(req: NextRequest) {
    // TODO: add your code that handles the PUT request here, referencing the code example below, and then remove these two line comments. For more usecases, see https://orm.drizzle.team/docs/update
    // return await doPUT(async (_db) => {
    //   // get the request data
    //   const body = await getRequestBody(req);
    //   const res = await _db.update(customer).set({
    //     firstName: body.firstName,
    //     lastName: body.lastName,
    //   }).where(eq(customer.id, 1));
    //   return res;
    // });
}

/**
 * Handle the DELETE request, DELETE request is used to delete an item
 * @param req NextRequest
 * @returns 
 */
export async function DELETE(req: NextRequest) {
    // TODO: add your code that handles the DELETE request here, referencing the code example below, and then remove these two line comments. For more usecases, see https://orm.drizzle.team/docs/delete
    // return await doDELETE(async (_db) => {
    //   const body = await getRequestBody(req);
    //   const res = await _db.delete(customer).where(eq(customer.id, 1));
    //   return res;
    // });
}
