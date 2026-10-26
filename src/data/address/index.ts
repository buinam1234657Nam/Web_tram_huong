import units from "./vn-admin-units-2025.json";

/**
 * Vietnam's administrative units after the 2025 merger (in force from
 * 1/7/2025): 34 provinces/cities, each split straight into wards, communes and
 * special zones, with no district level. A static snapshot so checkout never
 * calls an outside API; refresh it with `node scripts/import-admin-units.mjs`.
 */
export interface AdminUnit {
  code: number;
  name: string;
}

export interface Province extends AdminUnit {
  wards: AdminUnit[];
}

type RawProvince = { code: number; name: string; wards: Array<[number, string]> };

export const provinces: Province[] = (units as RawProvince[]).map((p) => ({
  code: p.code,
  name: p.name,
  wards: p.wards.map(([code, name]) => ({ code, name })),
}));

const provinceByName = new Map(provinces.map((p) => [p.name, p]));

export function findProvince(name: string): Province | undefined {
  return provinceByName.get(name);
}

export function wardsOf(provinceName: string): AdminUnit[] {
  return provinceByName.get(provinceName)?.wards ?? [];
}

export function isWardOf(provinceName: string, wardName: string): boolean {
  return wardsOf(provinceName).some((w) => w.name === wardName);
}

const UNIT_PREFIX = /^(tinh|thanh pho|tp\.?|phuong|xa|dac khu)\s+/;

/**
 * Lowercase, drop diacritics and the unit type, so "sai gon", "Phường Sài Gòn"
 * and "phuong sai gon" all compare equal.
 */
export function normalizeUnitName(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")
    .replace(/\s+/g, " ")
    .trim()
    .replace(UNIT_PREFIX, "");
}
