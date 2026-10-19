import React from "react";
import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center space-y-4 px-4">
      <div className="relative">
        <Loader2 className="w-10 h-10 animate-spin text-forest" />
      </div>
      <div className="text-center space-y-1">
        <p className="font-serif text-sm font-semibold text-charcoal">
          VĨNH TRẦM
        </p>
        <p className="text-xs text-muted">Đang tải hương trầm tự nhiên...</p>
      </div>
    </div>
  );
}
