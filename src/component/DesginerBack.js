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
    input
) {
    let d1 = (0.5 * d) / Math.sqrt(n);
    result.DP = d1;
    d1 = 20;
    let d2 = 24 + 2 * 2 + 2 * 6;
    result.ODR = d2;
    let D1 = 2 * d + d2 + 2 * 6;
    result.DPC = D1;

    let l, P;
    l = input.LF;
    P = input.BP;

    if (l) {
        let load = P * d2 * l;
        let directStress = (4 * load) / (Math.PI * d1 * d1);
        let bendingStress =
            (32 * (load * (l / 2 + 5))) / (Math.PI * d1 * d1 * d1);
        let PrinStress =
            bendingStress +
            Math.sqrt(
                bendingStress * bendingStress + 4 * directStress * directStress
            ) /
                2;
        let shearStress =
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
        let load = P * d2 * l;
        let directStress = (4 * load) / (Math.PI * d1 * d1);
        let bendingStress =
            (32 * (load * (l / 2 + 5))) / (Math.PI * d1 * d1 * d1);
        let PrinStress =
            bendingStress +
            Math.sqrt(
                bendingStress * bendingStress + 4 * directStress * directStress
            ) /
                2;
        let shearStress =
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
    let D = 2 * d;
    result.ODH = D;
    let l = 1.5 * d;
    result.LH = l;

    let stressInduced =
        (16 * T_max) / (Math.PI * ((Math.pow(D, 4) - Math.pow(d, 4)) / D));

    result.SSH = stressInduced;
    result.hubSafe = stressInduced < allowableShearStressforMate;
}

function keyDesign(d, T_max, input) {
    let shearStress, crushingStress;
    shearStress = input.SS;
    crushingStress = input.CSS;

    let w, t;
    w = d / 4;
    t = w = 14;
    let l = 1.5 * d;
    let shearStressKey = (2 * T_max) / (l * w * d);
    let crushingStressKey = (2 * 2 * T_max) / (l * t * d);
    result.SSK = shearStressKey;
    result.CSK = crushingStressKey;
    result.keySafe =
        shearStressKey < shearStress && crushingStressKey < crushingStress;
}

function flangeDesign(d, T_max, input) {
    let allowableShearStressforMate;
    allowableShearStressforMate = input.SC;

    let t = 0.5 * d;
    result.TF = t;
    let D = 2 * d;

    let shearStress = (2 * T_max) / (Math.PI * D * D * t);
    result.SSF = shearStress;
    result.flangeSafe = shearStress < allowableShearStressforMate;
}

export function main(input) {
    let Power, N;
    let factor;
    Power = input.power;
    N = input.rpm;

    let T_mean = (Power * 1000 * 60) / (2 * 3.14 * N);
    factor = input.MF;
    let T_max;

    if (factor == 1) {
        T_max = T_mean * 1000;
    } else {
        T_max = factor * T_mean * 1000;
    }
    result.T = T_max;

    let shearStress, crushingStress;
    shearStress = input.SS;
    crushingStress = input.CSS;

    let allowableShearStressforMate;

    allowableShearStressforMate = input.SC;

    let d = Math.pow((16 * T_max) / (3.14 * shearStress), 0.33);
    result.DS = d;
    d = standardShaftDia(d);
    result.SDS = d;
    let n = input.P;
    pinDesign(d, n, T_max, crushingStress, allowableShearStressforMate, input);

    hubDesign(d, T_max, allowableShearStressforMate);

    keyDesign(d, T_max, input);

    flangeDesign(d, T_max, input);
}
