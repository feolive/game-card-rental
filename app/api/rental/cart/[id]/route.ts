"use server";
import { NextRequest } from "next/server";
import { doGET, doPOST,doPUT,doDELETE, getRequestBody } from "@/app/_utils/service";
import { cart, cartCardMapping, gameCard} from "@/db/schema";
import { eq, and } from "drizzle-orm";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }>}) {
    const {id} = await params;
    return await doGET(async (_db) => {
        const result = await _db.select({
            id: cart.id,
            cartId: cart.id,
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
            .where(and(eq(cart.customerId, Number(id)),eq(cart.mark, 1)));
        return result;
    });
}
