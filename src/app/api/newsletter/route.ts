import { NextRequest, NextResponse } from "next/server";
import { newsletterSchema } from "@/data/schemas/newsletter";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = newsletterSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error.issues[0]?.message || "Email không hợp lệ" },
        { status: 400 }
      );
    }

    // Demo integration state
    return NextResponse.json({
      success: true,
      message: "Cảm ơn Quý khách đã đăng ký nhận bản tin thưởng trầm từ VĨNH TRẦM.",
      email: result.data.email,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Lỗi kết nối khi gửi đăng ký" },
      { status: 500 }
    );
  }
}
