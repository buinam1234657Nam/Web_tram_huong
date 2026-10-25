import { NextRequest, NextResponse } from "next/server";
import { checkoutFormSchema } from "@/data/schemas/checkout";
import { catalogRepository } from "@/data/repositories/catalog-repository";
import { brandConfig } from "@/lib/config/brand";
import type { Order, OrderLine } from "@/types/order";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { formData, items } = body;

    // Validate form schema
    const parseResult = checkoutFormSchema.safeParse(formData);
    if (!parseResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Dữ liệu đặt hàng không hợp lệ",
          validationErrors: parseResult.error.issues,
        },
        { status: 400 },
      );
    }

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { success: false, error: "Giỏ hàng rỗng, không thể tạo đơn hàng" },
        { status: 400 },
      );
    }

    // Verify items and prices against catalog
    let subtotal = 0;
    const verifiedOrderItems: OrderLine[] = [];

    for (const item of items) {
      const product = await catalogRepository.getProductById(item.productId);
      if (!product) continue;
      const variant = product.variants.find((v) => v.id === item.variantId);
      if (!variant) continue;

      const qty = Math.max(
        1,
        Math.min(item.quantity, variant.inventoryQuantity),
      );
      const linePrice = variant.price * qty;
      subtotal += linePrice;

      verifiedOrderItems.push({
        id: `${product.id}-${variant.id}`,
        productId: product.id,
        variantId: variant.id,
        name: product.name,
        variantName: variant.name,
        price: variant.price,
        quantity: qty,
        image: product.images[0],
      });
    }

    if (verifiedOrderItems.length === 0) {
      return NextResponse.json(
        { success: false, error: "Không tìm thấy sản phẩm hợp lệ trong kho" },
        { status: 400 },
      );
    }

    const shippingFee =
      subtotal >= brandConfig.policies.freeShippingThreshold
        ? 0
        : brandConfig.policies.shippingStandardFee;
    const total = subtotal + shippingFee;

    const orderId = `VT-${Date.now().toString().slice(-6)}-${Math.floor(1000 + Math.random() * 9000)}`;

    // Mock order: nothing is persisted server-side; the client keeps it for the success page.
    const orderRecord: Order = {
      id: orderId,
      code: orderId,
      createdAt: new Date().toISOString(),
      shippingAddress: parseResult.data,
      paymentMethod: parseResult.data.paymentMethod,
      items: verifiedOrderItems,
      subtotal,
      shippingFee,
      total,
      status: "confirmed",
    };

    return NextResponse.json({
      success: true,
      order: orderRecord,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Lỗi hệ thống khi xử lý đơn hàng" },
      { status: 500 },
    );
  }
}
