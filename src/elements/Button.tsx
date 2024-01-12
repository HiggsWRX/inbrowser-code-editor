import { ReactNode } from "react";

const Button = ({
	onClick,
	children,
	unstylled,
	className,
}: {
	onClick: () => void;
	children: ReactNode;
	unstylled?: boolean;
	className?: string;
}) => {
	return (
		<button
			type="button"
			onClick={onClick}
			onKeyDown={onClick}
			tabIndex={-1}
			className={`
      cursor-pointer
      ${
				unstylled
					? "border-none bg-transparent text-white"
					: "bg-gray-8 min-w-40 rounded px-2 py-1 text-white text-xl font-medium border-gray-4"
			} ${className}`}
		>
			{children}
		</button>
	);
};

export default Button;
