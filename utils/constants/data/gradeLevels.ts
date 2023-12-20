export const GRADE_LEVEL = {
  N1: "N1: 2-3 years old",
  N2: "N2: 3-4 years old",
  K1: "K1: 4-5 years old",
  K2: "K2: 5-6 years old",
};

export function getGradeLevel(age: number) {
  let level = [];
  if (age >= 2 && age <= 3) level.push("N1");
  if (age >= 3 && age <= 4) level.push("N2");
  if (age >= 4 && age <= 5) level.push("K1");
  if (age >= 5 && age <= 6) level.push("K2");
  return level;
}

export const GRADE_LEVELS = [
  { level: "N1", label: "Nursery 1" },
  { level: "N2", label: "Nursery 2" },
  { level: "K1", label: "Kinder 1" },
  { level: "K2", label: "Kinder 2" },
] as const;
