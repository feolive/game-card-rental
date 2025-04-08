"use server";
import { NextRequest } from "next/server";
import { doGET, doPOST, getRequestBody } from "@/app/_utils/service";
import { eq } from "drizzle-orm";
import { order, gameCard, cardOrderMapping } from "@/db/schema";

/**
 * Handle the GET request, GET request is used to retrieve items
 * @param req NextRequest 
 * @returns 
 */
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const {id} = await params;
    return await doGET(async (_db) => {
      const result = await _db.select({
        id: order.id,
        name: gameCard.name,
        description: gameCard.description,
        img: gameCard.img,
        price: gameCard.price,
        quantity: cardOrderMapping.quantity
      })
      .from(order)
      .leftJoin(cardOrderMapping, eq(order.id, cardOrderMapping.orderId))
      .leftJoin(gameCard, eq(cardOrderMapping.cardId, gameCard.id))
      .where(eq(order.id, Number(id)));
      return result;
    });
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
    //   const res = await _db.insert(category).values({
    //     code: body.code,
    //     name: body.name,
    //     description: body.description,
    //   });
    //   return res;
    // });
}

/**
 * Handle the PUT request, PUT request is used to update a item
 * @param req NextRequest
 * @returns 
 */
export async function PUT(req: NextRequest) {
    // TODO: add your code that handles the PUT request here, referencing the code example below, and then remove these two line comments. For more usecases, see https://orm.drizzle.team/docs/update
    // return await doPUT(async (_db) => {
    //   // get the request data
    //   const body = await getRequestBody(req);
    //   const res = await _db.update(category).set({
    //     code: body.code,
    //     name: body.name,
    //     description: body.description,
    //   }).where(eq(category.id, 1));
    //   return res;
    // });
}

/**
 * Handle the DELETE request, DELETE request is used to delete a item
 * @param req NextRequest
 * @returns 
 */
export async function DELETE(req: NextRequest) {
    // TODO: add your code that handles the DELETE request here, referencing the code example below, and then remove these two line comments. For more usecases, see https://orm.drizzle.team/docs/delete
    // return await doDELETE(async (_db) => {
    //   const body = await getRequestBody(req);
    //   const res = await _db.delete(category).where(eq(category.id, 1));
    //   return res;
    // });
}
