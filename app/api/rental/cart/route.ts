"use server";
import { NextRequest } from "next/server";
import { doPOST,doPUT,doDELETE, getRequestBody } from "@/app/_utils/service";
import { cart, cartCardMapping, gameCard} from "@/db/schema";
import { eq, and } from "drizzle-orm";


export async function POST(request: NextRequest) {
  return await doPOST(async (_db) => {
    const {customerId, cardId, quantity} = await getRequestBody(request);
    const cartId = await (await _db.insert(cart).values({
      customerId
    }).returning())[0].id;
    const result = await _db.insert(cartCardMapping).values({
      cartId,
      cardId,
      quantity
    });
    return result;
  });
}

export async function PUT(request: NextRequest) {
  return await doPUT(async (_db) => {
    const {cartId, cardId, quantity} = await getRequestBody(request);
    const result = await _db.update(cartCardMapping).set({
      quantity
    }).where(and(eq(cartCardMapping.cartId, cartId),eq(cartCardMapping.cardId, cardId)));
    return result;
  });
}

export async function DELETE(request: NextRequest) {
  return await doDELETE(async (_db) => {
    const {cartId, cardId} = await getRequestBody(request);
    const result = await _db.delete(cartCardMapping).where(and(eq(cartCardMapping.cartId, cartId),eq(cartCardMapping.cardId, cardId)));
    return result;
  });
}
