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
  data: {
    type: "url" as QRDataType,
    data: {},
  },
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
  setData: (type, data) =>
    set((state) => ({
      data: {
        type,
        // If type is changing, clear all data to prevent error states
        data: state.data?.type === type ? { ...state.data.data, ...data } : {},
      },
    })),
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
      return data.data.message
        ? `sms:${data.data.phone}?body=${encodeURIComponent(data.data.message)}`
        : `tel:${data.data.phone}`;
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
    case "location": {
      const mapQuery = encodeURIComponent(
        `${data.data.address}${data.data.name ? ` (${data.data.name})` : ""}`
      );
      return `https://maps.google.com/maps?q=${mapQuery}`;
    }
    case "event": {
      // Convert YYYY-MM-DD HH:mm to YYYYMMDDTHHmmssZ
      const formatDate = (dateStr: string) => {
        if (!dateStr?.trim()) return "";
        const [date, time] = dateStr.split(" ");
        if (!date || !time) return "";
        return `${date.replace(/-/g, "")}T${time.replace(":", "")}00Z`;
      };

      const start = formatDate(data.data.start);
      const end = formatDate(data.data.end);
      if (!start || !end) return "";

      return `BEGIN:VEVENT
SUMMARY:${data.data.title}
DTSTART:${start}
DTEND:${end}${data.data.location ? `\nLOCATION:${data.data.location}` : ""}${data.data.description ? `\nDESCRIPTION:${data.data.description}` : ""}
END:VEVENT`;
    }
  }
};

// Helper function to check if data is empty
const isDataEmpty = (data: QRData): boolean => {
  return !Object.values(data.data).some((value) => value?.trim());
};

// Helper function to get QR code URL from store state
export const getQRCodeUrl = (state: QRState): string | null => {
  if (!state.data || isDataEmpty(state.data)) return null;

  const formattedData = formatQRData(state.data);
  if (!formattedData) return null;

  const params = new URLSearchParams({
    data: formattedData,
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
  if (!state.data || isDataEmpty(state.data)) return null;

  const formattedData = formatQRData(state.data);
  if (!formattedData) return null;

  const options = {
    value: formattedData,
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
