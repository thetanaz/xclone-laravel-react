import { SVGAttributes } from "react";

export default function ApplicationLogo({
    className,
    width = 300, // Default values if not provided
    height = 300.251,
    ...props
}: SVGAttributes<SVGElement> & {
    width?: number | string;
    height?: number | string;
}) {
    return (
        <svg
            {...props}
            width={width}
            height={height}
            viewBox="0 0 300 300.251" // Crucial for maintaining aspect ratio
            className={className}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M178.57 127.15 290.27 0h-26.46l-97.03 110.38L89.34 0H0l117.13 166.93L0 300.25h26.46l102.4-116.59 81.8 116.59h89.34M36.01 19.54H76.66l187.13 262.13h-40.66" />
        </svg>
    );
}
