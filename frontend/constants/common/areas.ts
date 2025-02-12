export const AREA_DESCRIPTION = {
  DOWNTOWN: "",
  EAST_VANCOUVER: "",
  WEST_VANCOUVER: "",
  NORTH_VANCOUVER: "",
  SOUTH_VANCOUVER: "",
  RICHMOND: "",
  BURNABY: "",
} as const;

export type AreaDescription = keyof typeof AREA_DESCRIPTION;
