import { MotionProps, MotionStyle, motion } from "framer-motion";

interface MenuButtonProps {
	id?: string, 
	onClick?: React.MouseEventHandler<HTMLButtonElement>, 
	children: MotionProps['children'],
	disabled?: boolean,
	style?: MotionStyle | undefined
}

const MenuButton = ({ id, onClick, children, disabled, style }: MenuButtonProps) => {
	return (
		<motion.button 
			style={style}
			disabled={disabled}
			className='menu-button pointer'
			id={id}
			whileHover={disabled ? {} : {
				boxShadow: 'none',
				scale: 0.95
			}}
			whileTap={disabled ? {} : {
				scale: 0.9
			}}
			onClick={disabled ? undefined : onClick}
		>
			{children}
		</motion.button>
	);
}

export default MenuButton;