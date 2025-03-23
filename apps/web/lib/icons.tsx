import type { SVGProps } from "react";
import { cn } from "./utils";

export type IconProps = SVGProps<SVGSVGElement>;

interface RawIconProps extends IconProps {
  icon: string;
}

const withDefaultSize = (
  Component: React.FC<IconProps>
): React.FC<IconProps> => {
  return (props: IconProps) => {
    return (
      <Component {...props} className={cn("!size-[18px]", props.className)} />
    );
  };
};

export const Icons = {
  URL: withDefaultSize((props: IconProps) => (
    <svg
      height="24"
      width="24"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M7 11C6.44772 11 6 11.4477 6 12C6 12.5523 6.44772 13 7 13V11ZM17 13C17.5523 13 18 12.5523 18 12C18 11.4477 17.5523 11 17 11V13ZM16 16C15.4477 16 15 16.4477 15 17C15 17.5523 15.4477 18 16 18V16ZM16 6C15.4477 6 15 6.44772 15 7C15 7.55228 15.4477 8 16 8V6ZM8 18C8.55228 18 9 17.5523 9 17C9 16.4477 8.55228 16 8 16V18ZM8 8C8.55228 8 9 7.55228 9 7C9 6.44772 8.55228 6 8 6V8ZM7 13H17V11H7V13ZM21 9V15H23V9H21ZM20 16H16V18H20V16ZM16 8H20V6H16V8ZM1 9V15H3V9H1ZM4 18H8V16H4V18ZM8 6H4V8H8V6ZM3 9C3 8.44772 3.44771 8 4 8V6C2.34314 6 1 7.34315 1 9H3ZM21 15C21 15.5523 20.5523 16 20 16V18C21.6569 18 23 16.6569 23 15H21ZM1 15C1 16.6569 2.34315 18 4 18V16C3.44772 16 3 15.5523 3 15H1ZM23 9C23 7.34315 21.6569 6 20 6V8C20.5523 8 21 8.44772 21 9H23Z"
        fill="currentColor"
      />
    </svg>
  )),
  Text: withDefaultSize((props: IconProps) => (
    <svg
      height="24"
      width="24"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M4 6V4H12M12 4H20V6M12 4V20M12 20H10M12 20H14"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  )),
  Email: withDefaultSize((props: IconProps) => (
    <svg
      height="24"
      width="24"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M16.7368 19.6541C15.361 20.5073 13.738 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 13.9262 20.0428 15.9154 17.8101 15.7125C15.9733 15.5455 14.6512 13.8737 14.9121 12.0479L15.4274 8.5M14.8581 12.4675C14.559 14.596 12.8066 16.1093 10.9442 15.8476C9.08175 15.5858 7.81444 13.6481 8.11358 11.5196C8.41272 9.39109 10.165 7.87778 12.0275 8.13953C13.8899 8.40128 15.1573 10.339 14.8581 12.4675Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  )),
  Phone: withDefaultSize((props: IconProps) => (
    <svg
      height="24"
      width="24"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9.55279 5.10557C9.214 4.428 8.52148 4 7.76393 4H6C4.89543 4 4 4.89543 4 6C4 13.732 10.268 20 18 20C19.1046 20 20 19.1046 20 18V16.2361C20 15.4785 19.572 14.786 18.8944 14.4472L16.9909 13.4954C16.3991 13.1996 15.6845 13.3155 15.2167 13.7833C14.7819 14.2181 14.1244 14.3618 13.5758 14.0842C11.9109 13.2415 10.7585 12.0891 9.91583 10.4242C9.63816 9.87559 9.78189 9.21811 10.2167 8.78335C10.6845 8.31554 10.8004 7.60087 10.5046 7.00914L9.55279 5.10557Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  )),
  WiFi: withDefaultSize((props: IconProps) => (
    <svg
      height="24"
      width="24"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M21 8.07275C15.751 3.97575 8.249 3.97575 3 8.07275M6.75098 13.3144C9.81298 10.9264 14.188 10.9264 17.25 13.3144"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M12.0898 17.8799C12.5309 17.9249 12.875 18.2971 12.875 18.75C12.875 19.2332 12.4832 19.625 12 19.625C11.5168 19.625 11.125 19.2332 11.125 18.75C11.125 18.2668 11.5168 17.875 12 17.875L12.0898 17.8799Z"
        fill="currentColor"
        stroke="currentColor"
        strokeLinecap="square"
        strokeWidth="0.75"
      />
    </svg>
  )),
  Passport: withDefaultSize((props: IconProps) => (
    <svg
      height="24"
      width="24"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9.5 16H14.5M14.5 10.5C14.5 11.8807 13.3807 13 12 13C10.6193 13 9.5 11.8807 9.5 10.5C9.5 9.11929 10.6193 8 12 8C13.3807 8 14.5 9.11929 14.5 10.5ZM6.5 20.5H17.5C18.6046 20.5 19.5 19.6046 19.5 18.5V5.5C19.5 4.39543 18.6046 3.5 17.5 3.5H6.5C5.39543 3.5 4.5 4.39543 4.5 5.5V18.5C4.5 19.6046 5.39543 20.5 6.5 20.5Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  )),
  Download: withDefaultSize((props: IconProps) => (
    <svg
      height="24"
      width="24"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M20 15V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V15M12 14.5V4M12 14.5L8.5 11M12 14.5L15.5 11"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  )),
  Copy: withDefaultSize((props: IconProps) => (
    <svg
      height="24"
      width="24"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M15 5H17C18.1046 5 19 5.89543 19 7V19C19 20.1046 18.1046 21 17 21H7C5.89543 21 5 20.1046 5 19V7C5 5.89543 5.89543 5 7 5H9M15 5V7H9V5M15 5C15 3.89543 14.1046 3 13 3H11C9.89543 3 9 3.89543 9 5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  )),
  Check: withDefaultSize((props: IconProps) => (
    <svg
      height="24"
      width="24"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M5 12.875L9.2 17L19 6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  )),
  QRCode: withDefaultSize((props: IconProps) => (
    <svg
      height="24"
      width="24"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M14 14V16H16M18 14H20M20 18H18V20M14 19.99V20M16 10H18C19.1046 10 20 9.10457 20 8V6C20 4.89543 19.1046 4 18 4H16C14.8954 4 14 4.89543 14 6V8C14 9.10457 14.8954 10 16 10ZM6 20H8C9.10457 20 10 19.1046 10 18V16C10 14.8954 9.10457 14 8 14H6C4.89543 14 4 14.8954 4 16V18C4 19.1046 4.89543 20 6 20ZM6 10H8C9.10457 10 10 9.10457 10 8V6C10 4.89543 9.10457 4 8 4H6C4.89543 4 4 4.89543 4 6V8C4 9.10457 4.89543 10 6 10Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  )),
  SVG: withDefaultSize((props: IconProps) => (
    <svg
      height="24"
      width="24"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M5 11V6C5 4.89543 5.89543 4 7 4H14.1716C14.702 4 15.2107 4.21071 15.5858 4.58579L18.4142 7.41421C18.7893 7.78929 19 8.29799 19 8.82843V11"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M10 15L12 20L14 15"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M20.125 18.0548V19.3827C19.7022 19.8416 19.006 20.0437 18.3903 20.0511C17.1481 20.0511 16.25 18.9838 16.25 17.5345C16.25 16.0851 17.1948 15.0178 18.2481 14.9537C18.6289 14.9306 19.2665 15.0155 19.6259 15.3648"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M14 5V7C14 8.10457 14.8954 9 16 9H18"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M7 15H5.25C4.55964 15 4 15.5596 4 16.25V16.25C4 16.9404 4.55964 17.5 5.25 17.5H5.75C6.44036 17.5 7 18.0596 7 18.75V18.75C7 19.4404 6.44036 20 5.75 20H4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  )),
  PNG: withDefaultSize((props: IconProps) => (
    <svg
      height="24"
      width="24"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M5 11V6C5 4.89543 5.89543 4 7 4H14.1716C14.702 4 15.2107 4.21071 15.5858 4.58579L18.4142 7.41421C18.7893 7.78929 19 8.29799 19 8.82843V11"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M4 20V15H5.75C6.57843 15 7.25 15.6716 7.25 16.5C7.25 17.3284 6.57843 18 5.75 18H4.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M10 20V15H10.25L13.25 20H13.5V15"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M20.125 18.0548V19.3827C19.7022 19.8416 19.006 20.0437 18.3903 20.0511C17.1481 20.0511 16.25 18.9838 16.25 17.5345C16.25 16.0851 17.1948 15.0178 18.2481 14.9537C18.6289 14.9306 19.2665 15.0155 19.6259 15.3648"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M14 5V7C14 8.10457 14.8954 9 16 9H18"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  )),
  JPG: withDefaultSize((props: IconProps) => (
    <svg
      height="24"
      width="24"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M5 11V6C5 4.89543 5.89543 4 7 4H14.1716C14.702 4 15.2107 4.21071 15.5858 4.58579L18.4142 7.41421C18.7893 7.78929 19 8.29799 19 8.82843V11M14 5V7C14 8.10457 14.8954 9 16 9H18"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M9.5 20V15H11.25C12.0784 15 12.75 15.6716 12.75 16.5C12.75 17.3284 12.0784 18 11.25 18H10"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M6.5 15V18.5C6.5 19.3284 5.82843 20 5 20H4.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M19.125 18.0548V19.3827C18.7022 19.8416 18.006 20.0437 17.3903 20.0511C16.1481 20.0511 15.25 18.9838 15.25 17.5345C15.25 16.0851 16.1948 15.0178 17.2481 14.9537C17.6289 14.9306 18.2665 15.0155 18.6259 15.3648"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  )),
  Image: withDefaultSize((props: IconProps) => (
    <svg
      height="24"
      width="24"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M4 14.2105L6.84488 12.0821C7.66137 11.5378 8.75215 11.6663 9.41987 12.3853C10.9123 13.9926 12.6426 15.4538 15 15.4538C17.1727 15.4538 18.6125 14.6485 20 13.261M6 20H18C19.1046 20 20 19.1046 20 18V6C20 4.89543 19.1046 4 18 4H6C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20ZM17 9C17 10.1046 16.1046 11 15 11C13.8954 11 13 10.1046 13 9C13 7.89543 13.8954 7 15 7C16.1046 7 17 7.89543 17 9Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  )),
};
