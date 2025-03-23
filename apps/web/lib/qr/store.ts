import { create } from "zustand";
import {
  DEFAULT_LEVEL,
  DEFAULT_MARGIN,
  DEFAULT_SIZE,
  type QR_LEVELS,
} from "tinyqrc/constants";
import type { QRData, QRDataType } from "@/lib/qr/types";
import { generateSVG } from "tinyqrc";

interface QRState {
  // Core QR data
  data: {
    type: QRDataType;
    data: Record<string, string>;
  } | null;
  // Appearance
  fgColor: string;
  bgColor: string;
  logo?: string;
  // Settings
  size: number;
  margin: number;
  level: (typeof QR_LEVELS)[number];
  // Actions
  setData: (type: QRDataType, data: Record<string, string>) => void;
  setFgColor: (color: string) => void;
  setBgColor: (color: string) => void;
  setLogo: (url: string) => void;
  setSize: (size: number) => void;
  setMargin: (margin: number) => void;
  setLevel: (level: (typeof QR_LEVELS)[number]) => void;
  reset: () => void;
}

// Initial state values
const initialState = {
  data: null,
  fgColor: "#000000",
  bgColor: "#FFFFFF",
  logo: undefined,
  size: DEFAULT_SIZE,
  margin: DEFAULT_MARGIN,
  level: DEFAULT_LEVEL as (typeof QR_LEVELS)[number],
};

// Create the store
export const useQRStore = create<QRState>((set) => ({
  ...initialState,

  // Actions
  setData: (type, data) => set({ data: { type, data } }),
  setFgColor: (fgColor) => set({ fgColor }),
  setBgColor: (bgColor) => set({ bgColor }),
  setLogo: (logo) => set({ logo }),
  setSize: (size) => set({ size }),
  setMargin: (margin) => set({ margin }),
  setLevel: (level) => set({ level }),
  reset: () => set(initialState),
}));

// Helper function to format QR data based on type
export const formatQRData = (data: QRData): string => {
  switch (data.type) {
    case "text":
      return data.data.text;
    case "url":
      return data.data.url;
    case "email":
      return `mailto:${data.data.to}?subject=${encodeURIComponent(data.data.subject)}&body=${encodeURIComponent(data.data.body)}`;
    case "phone":
      return `tel:${data.data.phone}`;
    case "wifi":
      return `WIFI:S:${data.data.ssid};T:WPA;P:${data.data.password};;`;
    case "vcard":
      return `BEGIN:VCARD
VERSION:3.0
FN:${data.data.name}
TEL:${data.data.phone}
EMAIL:${data.data.email}
URL:${data.data.url}
END:VCARD`;
  }
};

// Helper function to get QR code URL from store state
export const getQRCodeUrl = (state: QRState): string | null => {
  if (!state.data) return null;

  const params = new URLSearchParams({
    data: formatQRData(state.data),
    ...(state.fgColor !== initialState.fgColor && { fgColor: state.fgColor }),
    ...(state.bgColor !== initialState.bgColor && { bgColor: state.bgColor }),
    ...(state.size !== initialState.size && { size: state.size.toString() }),
    ...(state.margin !== initialState.margin && {
      margin: state.margin.toString(),
    }),
    ...(state.level !== initialState.level && { level: state.level }),
  });

  if (state.logo) {
    params.append("logo", state.logo);
  }

  return process.env.NODE_ENV === "development"
    ? `http://localhost:8787/v1/qr?${encodeURIComponent(params.toString())}`
    : `https://api.tinyqrc.com/v1/qr?${encodeURIComponent(params.toString())}`;
};

export const getQRCodeSVG = ({ state }: { state: QRState }): string | null => {
  if (!state.data) return null;

  const options = {
    value: formatQRData(state.data),
    ...(state.fgColor !== initialState.fgColor && { fgColor: state.fgColor }),
    ...(state.bgColor !== initialState.bgColor && { bgColor: state.bgColor }),
    ...(state.size !== initialState.size && { size: state.size }),
    ...(state.margin !== initialState.margin && {
      margin: Number(state.margin),
    }),
    ...(state.level !== initialState.level && { level: state.level }),
    ...(state.logo && {
      imageSettings: {
        src: state.logo,
        height: state.size / 4,
        width: state.size / 4,
        excavate: true,
      },
    }),
  };

  return generateSVG(options);
};
