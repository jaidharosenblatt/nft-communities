// Time ago
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
TimeAgo.addDefaultLocale(en);
export const timeAgo = new TimeAgo("en-US");

export const GRAPH_WIDTH = 500;
export const GRAPH_WIDTH_MOBILE = 300;

export const PADDING_MEDIUM = 24;
export const PADDING_LARGE = 12;
export const PADDING_SMALL = 4;
export const GRAPH_MODAL_WIDTH = GRAPH_WIDTH + 4 * PADDING_LARGE;
export const GRAPH_MODAL_WIDTH_MOBILE = GRAPH_WIDTH_MOBILE + 4 * PADDING_LARGE;
