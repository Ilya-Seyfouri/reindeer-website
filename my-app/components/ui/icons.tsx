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

export const LeafIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M5 19c0-8 5-14 15-14 0 10-6 15-14 15" />
    <path d="M5 19c3-4 6-7 10-9" />
  </Svg>
);

export const AntlersIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M9 20c0-5-1-7-3.5-9.5M5.5 10.5C4 9.5 3.5 8 3.5 5.5M5.5 10.5c0-2.5.8-4 2.5-5M7.2 14.5c-1.7 0-3.2-.8-4-2.3" />
    <path d="M15 20c0-5 1-7 3.5-9.5M18.5 10.5c1.5-1 2-2.5 2-5M18.5 10.5c0-2.5-.8-4-2.5-5M16.8 14.5c1.7 0 3.2-.8 4-2.3" />
  </Svg>
);

export const PawIcon = (p: IconProps) => (
  <Svg {...p}>
    <path
      d="M12 13c-2.6 0-5 2.4-5 4.6 0 1.5 1.1 2.4 2.5 2.4 1 0 1.6-.5 2.5-.5s1.5.5 2.5.5c1.4 0 2.5-.9 2.5-2.4 0-2.2-2.4-4.6-5-4.6Z"
      fill="currentColor"
      stroke="none"
    />
    <ellipse cx="6" cy="10.5" rx="1.7" ry="2.1" fill="currentColor" stroke="none" />
    <ellipse cx="9.4" cy="6.6" rx="1.8" ry="2.3" fill="currentColor" stroke="none" />
    <ellipse cx="14.6" cy="6.6" rx="1.8" ry="2.3" fill="currentColor" stroke="none" />
    <ellipse cx="18" cy="10.5" rx="1.7" ry="2.1" fill="currentColor" stroke="none" />
  </Svg>
);

export const SnowflakeIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 3v18M4.2 7.5l15.6 9M4.2 16.5l15.6-9" />
    <path d="m9.5 4.5 2.5 2 2.5-2M9.5 19.5l2.5-2 2.5 2M4.6 10.4l3.1-.5-1.1-3M19.4 13.6l-3.1.5 1.1 3M4.6 13.6l3.1.5-1.1 3M19.4 10.4l-3.1-.5 1.1-3" />
  </Svg>
);

export const GiftIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3.5" y="8" width="17" height="4" rx="1" />
    <path d="M5 12v7.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V12M12 8v12.5" />
    <path d="M12 8C10.5 5 7 4.5 7 6.5S10 8 12 8Zm0 0c1.5-3 5-3.5 5-1.5S14 8 12 8Z" />
  </Svg>
);

export const TreeIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 3 7.5 9h2.5L6 14h3l-4 5h14l-4-5h3l-4-5h2.5L12 3ZM12 19v2.5" />
  </Svg>
);

export const SparkleIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 3c.6 4.6 2.4 6.4 7 7-4.6.6-6.4 2.4-7 7-.6-4.6-2.4-6.4-7-7 4.6-.6 6.4-2.4 7-7Z" />
  </Svg>
);

export const StarIcon =({ size = 20, ...p }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 20 20" aria-hidden="true" focusable="false" {...p}>
    <path
      fill="currentColor"
      d="M10 1.6l2.47 5.2 5.7.68-4.2 3.9 1.1 5.63L10 14.2 4.93 17l1.1-5.63-4.2-3.9 5.7-.68L10 1.6Z"
    />
  </svg>
);

/* ---- Cute dog-themed icons for the main navigation ---- */

/** Shop: a chunky dog bone, tipped at a jaunty angle. */
export const BoneIcon = (p: IconProps) => (
  <Svg {...p}>
    <g transform="rotate(-30 12 12)" fill="currentColor" stroke="none">
      <circle cx="5.6" cy="9.7" r="2.5" />
      <circle cx="5.6" cy="14.3" r="2.5" />
      <circle cx="18.4" cy="9.7" r="2.5" />
      <circle cx="18.4" cy="14.3" r="2.5" />
      <rect x="5.6" y="10.3" width="12.8" height="3.4" rx="1.2" />
    </g>
  </Svg>
);

/** Track order: a little dog house with an arched door. */
export const DogHouseIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M2.8 11.2 12 3.8l9.2 7.4" />
    <path d="M5.2 9.4V20h13.6V9.4" />
    <path d="M9.4 20v-3.6a2.6 2.6 0 0 1 5.2 0V20" />
    <circle cx="12" cy="9.6" r="1.1" fill="currentColor" stroke="none" />
  </Svg>
);

/** Contact us: a happy dog face with floppy ears. */
export const DogFaceIcon = (p: IconProps) => (
  <Svg {...p}>
    <ellipse cx="12" cy="13" rx="6" ry="6.3" />
    <path d="M6.6 8.6C4.2 7.2 2.6 8.8 3.1 12.4c.3 2 1.8 2.6 3.1 1.3" />
    <path d="M17.4 8.6c2.4-1.4 4 .2 3.5 3.8-.3 2-1.8 2.6-3.1 1.3" />
    <circle cx="9.7" cy="12" r="0.95" fill="currentColor" stroke="none" />
    <circle cx="14.3" cy="12" r="0.95" fill="currentColor" stroke="none" />
    <ellipse cx="12" cy="14.7" rx="1.35" ry="0.95" fill="currentColor" stroke="none" />
    <path d="M10.5 16.6q1.5 1.1 3 0" />
  </Svg>
);

/** Waiting list: a dog bowl piled with kibble, waiting for dinner. */
export const DogBowlIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3.4 13.2h17.2l-1.7 5.3a1.6 1.6 0 0 1-1.5 1.1H6.6a1.6 1.6 0 0 1-1.5-1.1z" />
    <circle cx="8.6" cy="10.6" r="1.35" fill="currentColor" stroke="none" />
    <circle cx="12" cy="9.6" r="1.45" fill="currentColor" stroke="none" />
    <circle cx="15.4" cy="10.7" r="1.3" fill="currentColor" stroke="none" />
    <circle cx="10.4" cy="7.4" r="1.1" fill="currentColor" stroke="none" />
  </Svg>
);
