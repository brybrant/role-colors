import * as Utils from './utils.js';

// Credit to Björn Ottosson
// https://github.com/bottosson/bottosson.github.io/blob/master/misc/colorpicker/colorconversion.js

/**
 * A number between 0 and 1
 * @typedef {number} Float
 */

/**
 * A number between 0 and 360
 * @typedef {number} Degrees
 */

/**
 * Validate input
 * @param {number} value
 * @param {'degrees'|'float'} type
 * @returns {number}
 */
function typecheck(value, type) {
  switch (type) {
    case 'degrees':
      try {
        const d = (value % 360) / 360;

        return d;
      } catch {
        console.error(`Parameter ${value} must be a number in degrees.`);
      }
      break;

    case 'float':
      try {
        const f = Utils.toFloat(value);

        if (value > 1) {
          console.warn(`Parameter ${value} is greater than 1.`);
        } else if (value < 0) {
          console.warn(`Parameter ${value} is less than 0.`);
        }

        return f;
      } catch {
        console.error(`Parameter ${value} must be a float between 0 and 1.`);
      }
      break;

    default:
      console.error(`Unrecognised type: ${type}`);
  }

  return 0;
}

/**
 * Convert OkHSV to RGBA
 * @param {Degrees} hue
 * @param {Float} saturation
 * @param {Float} value
 * @param {Float} [alpha]
 * @returns {number[]} `[red, green, blue, alpha]`
 */
export function okhsv2rgba(hue, saturation, value, alpha = 1) {
  const h = typecheck(hue, 'degrees');
  const s = typecheck(saturation, 'float');
  const v = typecheck(value, 'float');
  const a = alpha === 1 ? 1 : typecheck(alpha, 'float');

  if (v === 0) {
    return [0, 0, 0, a];
  } else if (s === 0) {
    const b = 255 * v;
    return [b, b, b, a];
  }

  const a_ = Math.cos(2 * Math.PI * h);
  const b_ = Math.sin(2 * Math.PI * h);

  const ST_max = Utils.get_ST_max(a_, b_);
  const S_max = ST_max[0];
  const S_0 = 0.5;
  const T = ST_max[1];
  const k = 1 - S_0 / S_max;

  const L_v = 1 - (s * S_0) / (S_0 + T - T * k * s);
  const C_v = (s * T * S_0) / (S_0 + T - T * k * s);

  let L = v * L_v;
  let C = v * C_v;

  const L_vt = Utils.toe_inv(L_v);
  const C_vt = (C_v * L_vt) / L_v;

  const L_new = Utils.toe_inv(L);
  C = (C * L_new) / L;
  L = L_new;

  const rgb_scale = Utils.oklab_to_linear_srgb(L_vt, a_ * C_vt, b_ * C_vt);
  const scale_L = Math.cbrt(
    1 / Math.max(rgb_scale[0], rgb_scale[1], rgb_scale[2], 0),
  );

  // remove to see effect without rescaling
  L = L * scale_L;
  C = C * scale_L;

  const rgb = Utils.oklab_to_linear_srgb(L, C * a_, C * b_);

  return [
    255 * Utils.srgb_transfer_function(rgb[0]),
    255 * Utils.srgb_transfer_function(rgb[1]),
    255 * Utils.srgb_transfer_function(rgb[2]),
    a,
  ];
}

/**
 * Convert OkHSL to RGBA
 * @param {Degrees} hue
 * @param {Float} saturation
 * @param {Float} lightness
 * @param {Float} [alpha]
 * @returns {number[]} `[red, green, blue, alpha]`
 */
export function okhsl2rgba(hue, saturation, lightness, alpha = 1) {
  const h = typecheck(hue, 'degrees');
  const s = typecheck(saturation, 'float');
  const l = typecheck(lightness, 'float');
  const a = alpha === 1 ? 1 : typecheck(alpha, 'float');

  if (l >= 1) {
    return [255, 255, 255, a];
  } else if (l <= 0) {
    return [0, 0, 0, a];
  }

  const a_ = Math.cos(2 * Math.PI * h);
  const b_ = Math.sin(2 * Math.PI * h);
  const L = Utils.toe_inv(l);

  const Cs = Utils.get_Cs(L, a_, b_);
  const C_0 = Cs[0];
  const C_mid = Cs[1];
  const C_max = Cs[2];

  let t, k_0, k_1, k_2;

  if (s < 0.8) {
    t = 1.25 * s;
    k_0 = 0;
    k_1 = 0.8 * C_0;
    k_2 = 1 - k_1 / C_mid;
  } else {
    t = 5 * (s - 0.8);
    k_0 = C_mid;
    k_1 = (0.2 * C_mid * C_mid * 1.25 * 1.25) / C_0;
    k_2 = 1 - k_1 / (C_max - C_mid);
  }

  const C = k_0 + (t * k_1) / (1 - k_2 * t);

  const rgb = Utils.oklab_to_linear_srgb(L, C * a_, C * b_);

  return [
    255 * Utils.srgb_transfer_function(rgb[0]),
    255 * Utils.srgb_transfer_function(rgb[1]),
    255 * Utils.srgb_transfer_function(rgb[2]),
    a,
  ];
}

/**
 * @param {number} x
 * @returns {string} HEX representation of `x`
 */
function toHex(x) {
  const hex = Math.round(x).toString(16);
  return hex.length === 1 ? `0${hex}` : hex;
}

/**
 * Convert RGBA to HEX
 * @param {number} red
 * @param {number} green
 * @param {number} blue
 * @param {number} [alpha]
 * @returns {string} HEX color code
 */
export function rgba2hex(red, green, blue, alpha = 1) {
  const rgb = toHex(red) + toHex(green) + toHex(blue);
  const a = alpha === 1 ? 1 : typecheck(alpha, 'float');

  return a === 1 ? `#${rgb}` : `#${rgb}${toHex(255 * a)}`;
}
