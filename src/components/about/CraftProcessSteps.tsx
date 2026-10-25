import React from "react";

const STEPS = [
  {
    title: "Chọn phôi trầm",
    desc: "Tìm và chọn những gốc dó bầu đã tích nhựa thơm 15–20 năm ở vùng rừng Khánh Hòa và Quảng Nam.",
  },
  {
    title: "Xỉa giác bằng tay",
    desc: "Nghệ nhân dùng dao đục bóc từng lớp giác gỗ trắng không có dầu, chỉ giữ lại phần thớ trầm đậm nhất.",
  },
  {
    title: "Tiện & mài mộc",
    desc: "Tiện từng hạt, mài bóng bằng vải thô. Không phun sáp, không phủ dầu hay hóa chất.",
  },
  {
    title: "Ủ hương & kiểm tra",
    desc: "Ủ trong hũ gốm kín để tinh dầu tự thấm đều, rồi kiểm tra bằng khứu giác trước khi đóng gói gửi tới bạn.",
  },
];

/** The four craft steps as a plain numbered list. */
export function CraftProcessSteps() {
  return (
    <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-10">
      {STEPS.map((step, idx) => (
        <li key={step.title} className="border-t border-border-dark/20 pt-5">
          <p className="text-sm font-medium text-gold-dark">Bước {idx + 1}</p>
          <h3 className="mt-2 text-xl font-semibold text-charcoal">
            {step.title}
          </h3>
          <p className="mt-3 text-[15px] text-muted leading-relaxed">
            {step.desc}
          </p>
        </li>
      ))}
    </ol>
  );
}
