"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Salt ion concentrations
 */
const saltIonMap = {
    gypsum: {
        calcium: 40.08 / 172.19,
        sulfate: 96.07 / 172.19
    },
    epsom: {
        magnesium: 24.3 / 246.51,
        sulfate: 96.07 / 246.51
    },
    tableSalt: {
        sodium: 23 / 58.44,
        chloride: 35.45 / 58.44
    },
    calciumChloride: {
        calcium: 40.08 / 147.02,
        chloride: 70.9 / 147.02
    },
    magnesiumChloride: {
        magnesium: 24.3 / 203.32,
        chloride: 70.9 / 203.32
    },
    bakingSoda: {
        sodium: 23 / 84,
        bicarbonate: 61 / 84,
    },
    chalkUndissolved: {
        calcium: (40.08 / 100.09) / 2,
        bicarbonate: (61 / 100.09)
    },
    chalkDissolved: {
        calcium: 40.08 / 100.09,
        bicarbonate: (61 / 100.09) * 2
    }
};
exports.default = saltIonMap;
//# sourceMappingURL=salt-ions.js.map