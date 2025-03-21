import classNames from "classnames";
import { motion } from "framer-motion";
import { MouseEventHandler } from "react";
import { SERVER_URI } from "../constants";

interface UserImageProps {
  user: { id: string, username: string, type: string }, 
  onClick?: MouseEventHandler<HTMLImageElement>, 
  size?: number, 
  label?: string, 
  orientation?: "horizontal" | "vertical",
	color?: string
}

export const UserImage = ({ user, onClick, size=50, label, orientation="vertical", color='white' }: UserImageProps) => {
	return (
		<div className={classNames({
			'user-image-container': true,
			'horizontal': orientation === "horizontal"
		})}>
			<label style={{ color }}>
				{label || user.username || 'username'}
			</label>
			<motion.img 
				className={classNames({
					'user-image': true,
					pointer: onClick !== undefined
				})}
				draggable={false}
				src={!user.id || user.type === 'Agent' ? `${SERVER_URI}/images/profilePictures/bot.jpg` : `${SERVER_URI}/images/profiles/${user.id}`} 
				alt={user.id}
				onClick={onClick}
				width={size}
				height={size}
				whileHover={{ scale: onClick ? 1.1 : 1 }}
			/>
		</div>
	);
};