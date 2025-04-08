"use server";
import { NextRequest } from "next/server";
import { doPOST, getRequestBody } from "@/app/_utils/service";
import { eq, and } from "drizzle-orm";
import { gameCard, order, cardOrderMapping, customer, cartCardMapping } from "@/db/schema";

/**
 * Handle the POST request, POST request is used to create a new item
 * @param req NextRequest
 * @returns 
 */
export async function POST(req: NextRequest) {
    return await doPOST(async (_db) => {
        const params = await getRequestBody(req) as { customerId: number; cost: number; cartId: number; cartItems: { cardId: number; quantity: number }[] };
        if (!params || params.cartItems.length === 0) {
            return { success: false, message: "No data requested" };
        }
        const { customerId, cost, cartId } = params;
        // create order
        const orderId = (await _db.insert(order).values({
            customerId,
            cost
        }).returning())[0].id;
        params.cartItems.forEach(async (param: { cardId: number; quantity: number }) => {
            const { cardId, quantity } = param;
            // update gameCard inventory
            // check if inventory is enough
            const inventory = await _db.select().from(gameCard).where(eq(gameCard.id, cardId));
            if (!inventory || inventory.length === 0) {
                return { success: false, message: "Game card sold out" };
            }
            if (Number(inventory[0].inventory) < quantity) {
                return { success: false, message: "Not enough inventory" };
            }
            await _db.update(gameCard).set({
                inventory: Number(inventory[0].inventory) - quantity
            }).where(eq(gameCard.id, cardId));
            // insert cardOrderMapping
            await _db.insert(cardOrderMapping).values({
                orderId,
                cardId,
                quantity
            });
            // remove the cart and customer relation
            await _db.delete(cartCardMapping).where(and(eq(cartCardMapping.cartId, cartId), eq(cartCardMapping.cardId, cardId)));
        });
        // update customer credits
        // check if customer credits is enough
        const customerData = await _db.select().from(customer).where(eq(customer.id, customerId));
        if (!customerData || customerData.length === 0) {
            return { success: false, message: "Customer not found" };
        }
        const customerCredits = Number(customerData[0].credits);
        if (customerCredits < cost) {
            return { success: false, message: "Not enough credits" };
        }
        await _db.update(customer).set({
            credits: Number(customerData[0].credits) - cost
        }).where(eq(customer.id, customerId));

        return { success: true, orderId };
    });
}