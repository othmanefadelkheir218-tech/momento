// ── Hero camera: where each frame of the hero video is drawn on the canvas ──
//
// The frames are drawn like `object-fit: cover`, plus a "camera" that zooms in and pans while
// the video plays, so the chefs' faces (frames 31 → ~213) stay out of the picture.
// Frame numbers are the file numbers (frame_000031.jpeg = frame 31).

// ── Source frames ──
export const SRC_W = 1928;
export const SRC_H = 1072;
// The frames have a dark strip ~40px wide on their right edge that looks like a border once the
// picture is framed. It is never drawn.
export const TRIM_RIGHT_PX = 44;
/** Usable width of a frame (without the dark right strip). */
export const FULL_W = SRC_W - TRIM_RIGHT_PX;

// ── Resting framing (no camera move) ──
// Which part of the frame stays visible when it is cropped to fill the screen
// (0 = left / top edge, 1 = right / bottom edge).
export const FOCUS_X_DESKTOP = 0.5;
export const FOCUS_X_MOBILE = 0.6;
export const FOCUS_Y = 0.5;

type Camera = {
    inStart: number; // zoom-in starts at this frame…
    inEnd: number; // …and is complete here
    outStart: number; // zoom-out starts at this frame…
    outEnd: number; // …and is back to the full scene here
    zoom: number; // how far in (1 = no zoom)
    focusX: number; // horizontal focus while zoomed (when there is no panX)
    focusY: number; // vertical focus while zoomed (1 = the bottom of the frame: the counter)
    /** Phones: [frame, focusX] points the camera pans through (replaces focusX). */
    panX?: [number, number][];
};

export const CAMERA_DESKTOP: Camera = {
    inStart: 0, // start right away, so the move is long and gentle
    inEnd: 31, // fully zoomed by the first face frame
    outStart: 200,
    outEnd: 265, // the video's own camera has moved down by now
    zoom: 1.6, // the top ~37% of the frame is off screen
    focusX: 0.6, // the tipping Spéculoos cup stays in the centre
    focusY: 1,
};

// Phones show the full frame height, so they need more zoom to push the faces off the top
// (1.8: the top ~44% is cropped). The camera goes straight DOWN onto the Spéculoos cup (no
// sideways move), stays on the cup while it tips, and only then follows the cream to the left.
// The pan points are where the view sits at zoom 1; the zoom grows around the centre of the view.
// NOTE: if this pan range gets wider, regenerate /public/heroSection-mobile (see MOBILE_STRIP).
export const CAMERA_MOBILE: Camera = {
    ...CAMERA_DESKTOP,
    zoom: 1.8,
    panX: [
        [0, 0.68], // straight down onto the Spéculoos cup…
        [110, 0.68], // …stays on it while it tips…
        [200, 0.54], // …then follows the cream as it spills to the left
        [265, 0.47], // the falling cream stream, centred
    ],
};

/** Horizontal focus of frame 0 on phones, so the frame-0 placeholder sits exactly where the canvas draws it. */
export const FOCUS_X_FRAME0_MOBILE = CAMERA_MOBILE.panX ? CAMERA_MOBILE.panX[0][1] : FOCUS_X_MOBILE;

/** "Smootherstep": eases in and out more gently than a plain smoothstep. */
const smooth = (t: number) => t * t * t * (t * (6 * t - 15) + 10);

/** How zoomed in the camera is at this frame: 0 = full scene, 1 = fully zoomed. */
export function cameraAmount(frame: number, camera: Camera) {
    if (frame <= camera.inStart || frame >= camera.outEnd) return 0;
    if (frame < camera.inEnd) return smooth((frame - camera.inStart) / (camera.inEnd - camera.inStart));
    if (frame <= camera.outStart) return 1;
    return smooth(1 - (frame - camera.outStart) / (camera.outEnd - camera.outStart));
}

/**
 * Pan at this frame: a smooth curve through the pan points (monotone cubic, Fritsch–Carlson).
 * It starts and ends gently, does NOT stop at the points in between, and never overshoots them.
 */
export function panXAt(frame: number, points: [number, number][]) {
    const n = points.length;
    if (frame <= points[0][0]) return points[0][1];
    if (frame >= points[n - 1][0]) return points[n - 1][1];

    // slope of each segment, then the curve's slope at each point
    const slopes = points.slice(1).map(([x, y], k) => (y - points[k][1]) / (x - points[k][0]));
    const tangents = points.map((_, k) => {
        if (k === 0 || k === n - 1) return 0; // gentle start / end
        return slopes[k - 1] * slopes[k] <= 0 ? 0 : (slopes[k - 1] + slopes[k]) / 2;
    });
    // limit the tangents so the curve never overshoots
    for (let k = 0; k < n - 1; k++) {
        if (slopes[k] === 0) {
            tangents[k] = tangents[k + 1] = 0;
            continue;
        }
        const a = tangents[k] / slopes[k];
        const b = tangents[k + 1] / slopes[k];
        const r = a * a + b * b;
        if (r > 9) {
            const t = 3 / Math.sqrt(r);
            tangents[k] = t * a * slopes[k];
            tangents[k + 1] = t * b * slopes[k];
        }
    }

    // cubic Hermite curve on the segment that contains `frame`
    let k = 0;
    while (frame > points[k + 1][0]) k++;
    const [x0, y0] = points[k];
    const [x1, y1] = points[k + 1];
    const h = x1 - x0;
    const t = (frame - x0) / h;
    const t2 = t * t;
    const t3 = t2 * t;
    return (
        (2 * t3 - 3 * t2 + 1) * y0 +
        (t3 - 2 * t2 + t) * h * tangents[k] +
        (-2 * t3 + 3 * t2) * y1 +
        (t3 - t2) * h * tangents[k + 1]
    );
}

/**
 * The pan to use at `zoom` so the CENTRE of the view stays where it is at zoom 1 (so zooming in
 * never slides the view sideways). Everything in frame pixels; s1 = scale at zoom 1, W = canvas width.
 */
function panAroundCentre(W: number, s1: number, zoom: number, panAtZoom1: number) {
    const visibleAtZoom1 = Math.min(FULL_W, W / s1);
    const centre = (FULL_W - visibleAtZoom1) * panAtZoom1 + visibleAtZoom1 / 2;
    const visible = visibleAtZoom1 / zoom;
    if (FULL_W - visible <= 0) return panAtZoom1;
    const left = Math.min(FULL_W - visible, Math.max(0, centre - visible / 2));
    return left / (FULL_W - visible);
}

/**
 * Where to draw `frame` on a W × H canvas: the frame's top-left corner (x, y), its scale (canvas
 * pixels per frame pixel), and how zoomed in the camera is (`amount`, see cameraAmount).
 */
export function placeFrame(W: number, H: number, frame: number, desktop: boolean) {
    const camera = desktop ? CAMERA_DESKTOP : CAMERA_MOBILE;
    const amount = cameraAmount(frame, camera);
    const zoom = 1 + (camera.zoom - 1) * amount;
    const scaleAtZoom1 = Math.max(W / FULL_W, H / SRC_H); // "cover"
    const scale = scaleAtZoom1 * zoom;

    const restX = desktop ? FOCUS_X_DESKTOP : FOCUS_X_MOBILE;
    const focusX = camera.panX
        ? panAroundCentre(W, scaleAtZoom1, zoom, panXAt(frame, camera.panX))
        : restX + (camera.focusX - restX) * amount;
    const focusY = FOCUS_Y + (camera.focusY - FOCUS_Y) * amount;

    return {
        amount,
        scale,
        x: (W - FULL_W * scale) * focusX,
        y: (H - SRC_H * scale) * focusY,
    };
}
