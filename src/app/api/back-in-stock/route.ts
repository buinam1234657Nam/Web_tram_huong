import { NextRequest, NextResponse } from "next/server";
import { backInStockSchema } from "@/data/schemas/back-in-stock";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = backInStockSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error.issues[0]?.message || "Thông tin không hợp lệ" },
        { status: 400 }
      );
    }

    // Demo integration state. TODO: lưu yêu cầu vào CRM / gửi thông báo cho nhân viên.
    return NextResponse.json({
      success: true,
      message: "Vĩnh Trầm sẽ báo cho Quý khách ngay khi sản phẩm có hàng trở lại.",
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Lỗi kết nối khi gửi yêu cầu" },
      { status: 500 }
    );
  }
}
