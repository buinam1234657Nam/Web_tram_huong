import { NextRequest, NextResponse } from "next/server";
import { catalogRepository } from "@/data/repositories/catalog-repository";
import { brandConfig } from "@/lib/config/brand";

interface RequestedCartItem {
  productId: string;
  variantId: string;
  quantity: number;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const items: RequestedCartItem[] = body.items || [];

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        {
          valid: false,
          error: "Giỏ hàng rỗng",
          items: [],
          subtotal: 0,
          shippingFee: 0,
          total: 0,
        },
        { status: 400 }
      );
    }

    const verifiedItems = [];
    let subtotal = 0;
    const errors: string[] = [];

    for (const item of items) {
      const product = await catalogRepository.getProductById(item.productId);
      if (!product) {
        errors.push(`Sản phẩm không còn tồn tại trên hệ thống (ID: ${item.productId})`);
        continue;
      }

      const variant = product.variants.find((v) => v.id === item.variantId);
      if (!variant) {
        errors.push(`Phiên bản sản phẩm "${product.name}" không hợp lệ`);
        continue;
      }

      if (variant.inventoryStatus === "out_of_stock" || variant.inventoryQuantity <= 0) {
        errors.push(`Sản phẩm "${product.name} - ${variant.name}" hiện đã hết hàng`);
        continue;
      }

      // Cap quantity to true server inventory
      const actualQuantity = Math.max(
        1,
        Math.min(item.quantity, variant.inventoryQuantity)
      );

      const verifiedPrice = variant.price;
      const itemSubtotal = verifiedPrice * actualQuantity;
      subtotal += itemSubtotal;

      verifiedItems.push({
        id: `${product.id}-${variant.id}`,
        productId: product.id,
        variantId: variant.id,
        name: product.name,
        slug: product.slug,
        variantName: variant.name,
        price: verifiedPrice,
        compareAtPrice: variant.compareAtPrice,
        image: product.images[0],
        quantity: actualQuantity,
        maxQuantity: variant.inventoryQuantity,
        subtotal: itemSubtotal,
      });
    }

    const shippingFee =
      subtotal >= brandConfig.policies.freeShippingThreshold
        ? 0
        : brandConfig.policies.shippingStandardFee;

    const total = subtotal + shippingFee;

    return NextResponse.json({
      valid: errors.length === 0 && verifiedItems.length > 0,
      errors,
      items: verifiedItems,
      subtotal,
      shippingFee,
      freeShippingThreshold: brandConfig.policies.freeShippingThreshold,
      total,
      verifiedAt: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json(
      { valid: false, error: "Lỗi xác thực dữ liệu giỏ hàng phía máy chủ" },
      { status: 500 }
    );
  }
}
