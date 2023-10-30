export var result = {};
function standardShaftDia(d) {
    if (d > 6 && d < 8) d = 8;
    if (d > 8 && d < 10) d = 10;
    if (d > 10 && d < 12) d = 12;
    if (d > 15 && d < 20) d = 20;
    if (d > 20 && d < 25) d = 25;
    if (d > 25 && d < 30) d = 30;
    if (d > 30 && d < 35) d = 35;
    if (d > 35 && d < 40) d = 40;
    if (d > 40 && d < 45) d = 45;
    if (d > 45 && d < 50) d = 50;
    if (d > 50 && d < 55) d = 55;
    if (d > 55 && d < 60) d = 60;
    if (d > 60 && d < 70) d = 70;
    if (d > 70 && d < 80) d = 80;
    if (d > 80 && d < 90) d = 90;
    if (d > 90 && d < 100) d = 100;
    if (d > 100 && d < 110) d = 110;
    if (d > 110 && d < 125) d = 125;
    if (d > 125 && d < 140) d = 140;
    if (d > 140 && d < 160) d = 160;
    if (d > 160 && d < 180) d = 180;
    if (d > 180 && d < 200) d = 200;

    return d;
}

function pinDesign(
    d,
    n,
    T_max,
    crushingStress,
    allowableShearStressforMate,
    l,
    P
) {
    const d1 = (0.5 * d) / Math.sqrt(n);
    result.DP = d1;
    const d2 = 24 + 2 * 2 + 2 * 6;
    result.ODR = d2;
    const D1 = 2 * d + d2 + 2 * 6;
    result.DPC = D1;

    if (l) {
        const load = P * d2 * l;
        const directStress = (4 * load) / (Math.PI * d1 * d1);
        const bendingStress =
            (32 * (load * (l / 2 + 5))) / (Math.PI * d1 * d1 * d1);
        const PrinStress =
            (bendingStress +
                Math.sqrt(
                    bendingStress * bendingStress +
                        4 * directStress * directStress
                )) /
            2;
        const shearStress =
            Math.sqrt(
                bendingStress * bendingStress + 4 * directStress * directStress
            ) / 2;

        result.PS = PrinStress;
        result.SS = shearStress;
        result.pinSafe =
            PrinStress < crushingStress &&
            shearStress < allowableShearStressforMate;
    } else {
        l = (2 * T_max) / (P * d2 * D1 * n);
        const load = P * d2 * l;
        const directStress = (4 * load) / (Math.PI * d1 * d1);
        const bendingStress =
            (32 * (load * (l / 2 + 5))) / (Math.PI * d1 * d1 * d1);
        const PrinStress =
            (bendingStress +
                Math.sqrt(
                    bendingStress * bendingStress +
                        4 * directStress * directStress
                )) /
            2;
        const shearStress =
            Math.sqrt(
                bendingStress * bendingStress + 4 * directStress * directStress
            ) / 2;
        result.PS = PrinStress;
        result.SS = shearStress;
        result.pinSafe =
            PrinStress < crushingStress &&
            shearStress < allowableShearStressforMate;
    }
}

function hubDesign(d, T_max, allowableShearStressforMate) {
    const D = 2 * d;
    result.ODH = D;
    const l = 1.5 * d;
    result.LH = l;
    const stressInduced =
        (16 * T_max) / (Math.PI * ((Math.pow(D, 4) - Math.pow(d, 4)) / D));

    result.SSH = stressInduced;
    result.hubSafe = stressInduced < allowableShearStressforMate;
}

function keyDesign(d, T_max, shearStress, crushingStress) {
    const w = d / 4;
    const t = w;
    const l = 1.5 * d;
    const shearStressKey = (2 * T_max) / (l * w * d);
    const crushingStressKey = (2 * 2 * T_max) / (l * t * d);
    result.SSK = shearStress;
    result.CSK = crushingStress;
    result.keySafe =
        shearStressKey < shearStress && crushingStressKey < crushingStress;
}

function flangeDesign(d, T_max, allowableShearStressforMate) {
    const t = 0.5 * d;
    result.TF = t;
    const D = 2 * d;
    const shearStress = (2 * T_max) / (Math.PI * D * D * t);
    result.SSF = shearStress;
    result.flangeSafe = shearStress < allowableShearStressforMate;
}

function getStress(material) {
    if (material === 1) {
        return [250, 475];
    }
    if (material === 2) {
        return [100, 200];
    }
    if (material === 3) {
        return [60, 380];
    }
    if (material === 4) {
        return [10, 30];
    }
    return [null, null];
}

export function main(input) {
    let Power, N, factor;
    Power = 10;
    N = 1200;

    const T_mean = (Power * 1000 * 60) / (2 * Math.PI * N);
    factor = 1;
    let T_max;
    if (factor === 1) {
        T_max = T_mean * 1000;
    } else {
        T_max = factor * T_mean * 1000;
    }
    result.T = T_max;

    let [shearStress, crushingStress] = getStress(Number(input.MS));
    let allowableShearStressforMate;
    allowableShearStressforMate = Number(input.MC);

    const d = Math.pow((16 * T_max) / (Math.PI * shearStress), 1 / 3);
    result.DS = d;
    const standardizedD = standardShaftDia(d);
    result.SDS = d;

    let n;
    n = input.NN;
    let l, P;
    l = 50;
    P = 1000;
    pinDesign(
        standardizedD,
        n,
        T_max,
        crushingStress,
        allowableShearStressforMate,
        l,
        P
    );

    hubDesign(standardizedD, T_max, allowableShearStressforMate);

    keyDesign(standardizedD, T_max, shearStress, crushingStress);

    flangeDesign(standardizedD, T_max, allowableShearStressforMate);
}
