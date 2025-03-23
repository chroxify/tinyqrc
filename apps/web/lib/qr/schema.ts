import { z } from "zod";
import { Icons } from "@/lib/icons";
import type { IconProps } from "@/lib/icons";
import type { QRDataTypesConfig } from "./types";

// Input field schema
export const inputFieldSchema = z.object({
  id: z.string(),
  placeholder: z.string(),
  type: z.enum(["text", "number", "email", "tel", "url"]).default("text"),
  label: z.string().optional(),
  className: z.string().optional(),
  validation: z.function().args(z.string()).returns(z.boolean()).optional(),
});

// Data type schema
export const dataTypeSchema = z.object({
  icon: z.custom<React.FC<IconProps>>(),
  inputs: z.array(inputFieldSchema),
  label: z.string(),
  layout: z
    .object({
      grid: z.boolean().default(false),
      columns: z.number().default(1),
    })
    .optional(),
});

// QR Data type definitions
export const qrDataSchemas = {
  text: z.object({ text: z.string() }),
  url: z.object({ url: z.string().url() }),
  email: z.object({
    to: z.string().email(),
    subject: z.string(),
    body: z.string(),
  }),
  phone: z.object({
    phone: z.string(),
    message: z.string().optional(),
  }),
  wifi: z.object({
    ssid: z.string(),
    password: z.string(),
  }),
  vcard: z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string(),
    url: z.string().url(),
  }),
} as const;

// Input configurations
export const DataInputs: QRDataTypesConfig = {
  text: {
    icon: Icons.Text,
    label: "Text",
    inputs: [
      {
        id: "text",
        placeholder: "Enter your text",
        type: "text",
      },
    ],
  },
  url: {
    icon: Icons.URL,
    label: "URL",
    inputs: [
      {
        id: "url",
        placeholder: "Enter URL",
        type: "url",
        validation: (value) => {
          // Allows URLs with or without protocol
          // Must have valid domain structure (e.g. example.com, sub.example.co.uk)
          // Can have paths, query params, fragments
          // Protocol if present must be http:// or https://
          return /^(?:(?:https?:\/\/)?(?:[\w-]+\.)+[a-z]{2,}(?:\/[^\s]*)?)?$/i.test(
            value
          );
        },
      },
    ],
  },
  email: {
    icon: Icons.Email,
    label: "Email",
    inputs: [
      {
        id: "to",
        placeholder: "To Email",
        type: "email",
        validation: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      },
      {
        id: "subject",
        placeholder: "Subject",
        type: "text",
      },
      {
        id: "body",
        placeholder: "Body",
        type: "text",
      },
    ],
  },
  phone: {
    icon: Icons.Phone,
    label: "Phone",
    inputs: [
      {
        id: "phone",
        placeholder: "Enter phone number",
        type: "tel",
        validation: (value) => /^\+?[\d\s-()]{10,}$/.test(value),
      },
      {
        id: "message",
        placeholder: "Message (optional)",
        type: "text",
      },
    ],
    layout: {
      grid: true,
      columns: 1,
    },
  },
  wifi: {
    icon: Icons.WiFi,
    label: "WiFi",
    inputs: [
      {
        id: "ssid",
        placeholder: "Network name (SSID)",
        type: "text",
      },
      {
        id: "password",
        placeholder: "Password",
        type: "text",
      },
    ],
    layout: {
      grid: true,
      columns: 1,
    },
  },
  vcard: {
    icon: Icons.Passport,
    label: "VCard",
    inputs: [
      {
        id: "name",
        placeholder: "Full Name",
        type: "text",
        className: "col-span-full",
      },
      {
        id: "email",
        placeholder: "Email",
        type: "email",
        className: "col-span-1",
      },
      {
        id: "phone",
        placeholder: "Phone",
        type: "tel",
        className: "col-span-1",
      },
      {
        id: "url",
        placeholder: "Website",
        type: "url",
        className: "col-span-full",
      },
    ],
    layout: {
      grid: true,
      columns: 2,
    },
  },
} as const;
