import { describe, it, expect } from "vitest";
import { profileChips, profileRows } from "@/lib/format/agarwood";
import type { AgarwoodProfile } from "@/types/product";

const EMPTY: AgarwoodProfile = {
  grade: null,
  origin: null,
  resinAgeYears: null,
  source: null,
  oilContent: null,
  scentProfile: null,
  sinksInWater: null,
  treatment: null,
  beadSizeMm: null,
  certificate: null,
};

describe("agarwood profile formatting", () => {
  it("renders nothing for an unconfirmed profile", () => {
    expect(profileChips(EMPTY)).toEqual([]);
    expect(profileRows(EMPTY)).toEqual([]);
  });

  it("shows only the chips that have data, in grade · origin · age order", () => {
    expect(
      profileChips({ ...EMPTY, grade: "chìm", resinAgeYears: "15–20 năm" }),
    ).toEqual(["Trầm chìm", "Tích 15–20 năm"]);
  });

  it("never prints null, undefined or empty values", () => {
    const rows = profileRows({ ...EMPTY, origin: "Vạn Ninh, Khánh Hòa", scentProfile: [] });
    expect(rows).toEqual([{ label: "Vùng trầm", value: "Vạn Ninh, Khánh Hòa" }]);
    rows.forEach((r) => expect(r.value).not.toMatch(/null|undefined/));
  });

  it("states sinking either way once it is known", () => {
    expect(profileRows({ ...EMPTY, sinksInWater: false })).toEqual([
      { label: "Thả nước", value: "Nổi" },
    ]);
  });
});
