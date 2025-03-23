import type { z } from "zod";
import type { FC } from "react";
import type { IconProps } from "@/lib/icons";
import type {
  qrDataSchemas,
  inputFieldSchema,
  dataTypeSchema,
  DataInputs,
} from "@/lib/qr/schema";

// Input field types
export type InputField = z.infer<typeof inputFieldSchema>;
export type DataTypeConfig = z.infer<typeof dataTypeSchema>;

// QR Data types
export type QRDataSchemas = typeof qrDataSchemas;
export type QRDataType =
  | "text"
  | "url"
  | "email"
  | "wifi"
  | "phone"
  | "vcard"
  | "location"
  | "event";
export type QRDataValues = {
  [K in QRDataType]: z.infer<QRDataSchemas[K]>;
};

// Combined QR Data type
export type QRData = {
  type: QRDataType;
  data: Record<string, string>;
};

// Input configurations type
export type DataInputConfigs = typeof DataInputs;

// Helper type to get empty data structure for a type
export type EmptyDataStructure<T extends QRDataType> = {
  [K in keyof QRDataValues[T]]: string;
};

export type QRDataInput = {
  type: "text" | "url" | "email" | "tel" | "number";
  id: string;
  placeholder: string;
  label?: string;
  className?: string;
  validation?: (value: string) => boolean;
};
export type QRDataConfig = {
  icon: FC<IconProps>;
  label: string;
  inputs: readonly QRDataInput[];
  layout?: {
    grid?: boolean;
    columns?: 1 | 2 | 3 | 4;
  };
};

export type QRDataTypesConfig = {
  [K in QRDataType]: QRDataConfig;
};
