import { MotionProps, motion } from "framer-motion";

interface MenuButtonProps {
	id?: string, 
	onClick?: React.MouseEventHandler<HTMLButtonElement>, 
	children: MotionProps['children'],
	disabled?: boolean
}

const MenuButton = ({ id, onClick, children, disabled }: MenuButtonProps) => {
	return (
		<motion.button 
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