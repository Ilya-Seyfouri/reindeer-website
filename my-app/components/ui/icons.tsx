import type { SVGProps } from "react";

/* One hand-drawn set: 24px grid, 1.75 stroke, round caps. */

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Svg({ size = 24, children, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export const BagIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M5 8h14l-1.2 11.2a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8L5 8Z" />
    <path d="M9 10V7a3 3 0 0 1 6 0v3" />
  </Svg>
);

export const MenuIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Svg>
);

export const CloseIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Svg>
);

export const PlusIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 5v14M5 12h14" />
  </Svg>
);

export const MinusIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M5 12h14" />
  </Svg>
);

export const CheckIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </Svg>
);

export const ArrowRightIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Svg>
);

export const ChevronDownIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="m6 9 6 6 6-6" />
  </Svg>
);

export const TruckIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3 6h11v10H3zM14 10h4l3 3v3h-7" />
    <circle cx="7" cy="17.5" r="1.75" />
    <circle cx="17.5" cy="17.5" r="1.75" />
  </Svg>
);

export const ShieldIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 3 5 6v5.5c0 4.3 2.9 8.1 7 9.5 4.1-1.4 7-5.2 7-9.5V6l-7-3Z" />
    <path d="m9 12 2 2 4-4" />
  </Svg>
);

export const LockIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect x="5" y="10.5" width="14" height="10" rx="2" />
    <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
  </Svg>
);

export const ReturnIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M9 14 4 9l5-5" />
    <path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11" />
  </Svg>
);

export const PlayIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M8 5.5v13l11-6.5-11-6.5Z" fill="currentColor" />
  </Svg>
);

export const CameraIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 8.5A1.5 1.5 0 0 1 5.5 7h2l1.5-2h6l1.5 2h2A1.5 1.5 0 0 1 20 8.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 17.5v-9Z" />
    <circle cx="12" cy="13" r="3.5" />
  </Svg>
);

export const FeatherIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M20 4c-6 0-11 4-12 11l-2 5" />
    <path d="M8 15c4 0 8-2 10-6M11 11h5" />
  </Svg>
);

export const ClockIcon = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </Svg>
);

export const WashIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 7h16l-1.5 11a2 2 0 0 1-2 1.7h-9a2 2 0 0 1-2-1.7L4 7Z" />
    <path d="M6.5 11.5c1.2.8 2.3.8 3.5 0s2.3-.8 3.5 0 2.3.8 3.5 0" />
  </Svg>
);

export const RulerIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3" y="8" width="18" height="8" rx="1.5" />
    <path d="M7 8v3M11 8v4M15 8v3M19 8v2" />
  </Svg>
);

export const MailIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
    <path d="m4.5 7 7.5 6 7.5-6" />
  </Svg>
);

export const PackageIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 3 4 7v10l8 4 8-4V7l-8-4Z" />
    <path d="M4 7l8 4 8-4M12 11v10" />
  </Svg>
);

export const StarIcon = ({ size = 20, ...p }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 20 20" aria-hidden="true" focusable="false" {...p}>
    <path
      fill="currentColor"
      d="M10 1.6l2.47 5.2 5.7.68-4.2 3.9 1.1 5.63L10 14.2 4.93 17l1.1-5.63-4.2-3.9 5.7-.68L10 1.6Z"
    />
  </svg>
);

export const benefitIcons = {
  feather: FeatherIcon,
  clock: ClockIcon,
  wash: WashIcon,
  camera: CameraIcon,
} as const;
