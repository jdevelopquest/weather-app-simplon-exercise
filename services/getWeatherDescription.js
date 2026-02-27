import descriptions from "./mappings/wmoWeatherInterpretationCodesDescriptions.json" with {type: "json"};

export default function getWeatherDescription (code) {
    return Object.hasOwn(descriptions, code) ? descriptions[code] : "oups no description";
}
