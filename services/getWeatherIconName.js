import icons from "./mappings/wmoWeatherInterpretationCodesIconNames.json" with {type: "json"};

export default function getWeatherIconName(code, isDay) {
  const key = String(code);
  const dn = isDay === true ? "day" : "night";
  return icons?.[key]?.[dn] ?? "blank";
}
