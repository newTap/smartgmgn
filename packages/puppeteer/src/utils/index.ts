import * as fs from "fs";
export const isNewerVersion = (
  current: string,
  comparingWith: string
): boolean => {
  if (current === comparingWith) return false;

  const currentFragments = current.replace(/[^\d.-]/g, "").split(".");
  const comparingWithFragments = comparingWith
    .replace(/[^\d.-]/g, "")
    .split(".");

  const length =
    currentFragments.length > comparingWithFragments.length
      ? currentFragments.length
      : comparingWithFragments.length;
  for (let i = 0; i < length; i++) {
    if (
      (Number(currentFragments[i]) || 0) ===
      (Number(comparingWithFragments[i]) || 0)
    )
      continue;
    return (
      (Number(comparingWithFragments[i]) || 0) >
      (Number(currentFragments[i]) || 0)
    );
  }
  return true;
};

export const dateFormatted = (date?: Date) => {
  var dateObj = date ? new Date(date) : new Date();
  var month = dateObj.getUTCMonth() + 1; //months from 1-12
  var day = dateObj.getUTCDate();
  var year = dateObj.getUTCFullYear();
  let newdate = day + "/" + month + "/" + year;
  return newdate;
};

export const getHour = (date?: Date) => {
  var dateObj = date ? new Date(date) : new Date();
  return dateObj.getHours() + 1;
};

export const isEmptyDir = async (dirnane: string) => {
  try {
    const files = fs.readdirSync(dirnane);
    return files.length === 0;
  } catch (err) {
    console.error(`Error reading directory: ${err.message}`);
    return false;
  }
};

export function splitValueAndUnit(str: string) {
  const match = str.match(/(\d+\.?\d*)(\D*)/);
  return match ? [match[1], match[2] ? match[2].toLocaleUpperCase() : ""] : [];
}

export type UNIT_TYPE = "K" | "M" | "G" | "k" | "m" | "g" | undefined;

export function unitValue(val: string, unit: UNIT_TYPE) {
  if (!unit) return val;
  if (!val) return val;
  if (isNaN(+val)) return val;
  unit = unit.toLocaleUpperCase() as UNIT_TYPE;
  const unitMap = {
    K: 1000,
    M: 1000 * 1000,
    G: 1000 * 1000 * 1000,
  };
  if (!unitMap[unit]) return val;
  return unitMap[unit] * +val;
}

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function haveWalletProcess() {
  return !!process.env.WALLET_SECRET && !!process.env.WALLET_PASSWORD;
}
