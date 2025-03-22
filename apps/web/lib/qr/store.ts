import { create } from "zustand";
import type { QR_LEVELS } from "tinyqrc/constants";
import type {
  QRData,
  QRDataType,
  EmptyDataStructure,
  QRDataValues,
} from "@/lib/qr/types";
import { qrDataSchemas } from "@/lib/qr/schema";

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
  size: 600,
  margin: 4,
  level: "L" as const,
};

// Helper to get empty data structure for a type
const getEmptyDataForType = <T extends QRDataType>(
  type: T
): EmptyDataStructure<T> => {
  const schema = qrDataSchemas[type];
  const shape = schema.shape;
  return Object.keys(shape).reduce((acc, key) => {
    acc[key as keyof EmptyDataStructure<T>] = "";
    return acc;
  }, {} as EmptyDataStructure<T>);
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
    fgColor: state.fgColor,
    bgColor: state.bgColor,
    // size: state.size.toString(),
    // margin: state.margin.toString(),
    // level: state.level,
  });

  if (state.logo) {
    params.append("logo", state.logo);
  }

  return `https://api.tinyqrc.com/v1/qr?${params.toString()}`;
};
