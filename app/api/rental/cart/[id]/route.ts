"use server";
import { NextRequest } from "next/server";
import { doGET, doPOST,doPUT,doDELETE, getRequestBody } from "@/app/_utils/service";
import { cart, cartCardMapping, gameCard} from "@/db/schema";
import { eq, and } from "drizzle-orm";

export async function GET(request: NextRequest, { params }: { params: { id: number } }) {
    const {id} = await params;
    return await doGET(async (_db) => {
        const result = await _db.select({
            id: cart.id,
            cardId: cartCardMapping.cardId,
            customerId: cart.customerId,
            quantity: cartCardMapping.quantity,
            name: gameCard.name,
            description: gameCard.description,
            img: gameCard.img,
            price: gameCard.price,
            totalCost: cart.totalCost
        })
            .from(cart)
            .leftJoin(cartCardMapping, eq(cart.id, cartCardMapping.cartId))
            .leftJoin(gameCard, eq(cartCardMapping.cardId, gameCard.id))
            .where(and(eq(cart.customerId, id),eq(cart.mark, 1)));
        return result;
    });
}

export async function POST(request: NextRequest) {
  return await doPOST(async (_db) => {
    const {customerId, cardId, quantity, totalCost} = await getRequestBody(request);
    const cartId = (await _db.insert(cart).values({
      customerId,
      totalCost,
    }).returning()).id;
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
