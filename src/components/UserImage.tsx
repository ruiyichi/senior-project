import classNames from "classnames";
import { motion } from "framer-motion";
import { MouseEventHandler } from "react";
import { SERVER_URI } from "../constants";

interface UserImageProps {
  user: { id: string, username: string }, 
  onClick?: MouseEventHandler<HTMLImageElement>, 
  size?: number, 
  label?: string, 
  orientation?: "horizontal" | "vertical"
}

export const UserImage = ({ user, onClick, size=50, label, orientation="vertical" }: UserImageProps) => {
	return (
		<div className={classNames({
			'user-image-container': true,
			'horizontal': orientation === "horizontal"
		})}>
			{label || user.username || 'username'}
			<motion.img 
				className={classNames({
					'user-image': true,
					pointer: onClick !== undefined
				})}
				draggable={false}
				src={!user.id ? '' : `${SERVER_URI}/images/profiles/${user.id}?${Date.now()}`} 
				alt={user.id}
				onClick={onClick}
				width={size}
				height={size}
				whileHover={{ scale: onClick ? 1.1 : 1 }}
			/>
		</div>
	);
};