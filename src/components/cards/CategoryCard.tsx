import { Box, createStyles } from "@mantine/core";
import { ReactNode } from "react";

interface CategoryCardProps {
	children: ReactNode;
	selected: boolean;
	onSelect: () => void;
}

const useStyles = createStyles((theme, { selected }: { selected: boolean }) => ({
	container: {
		backgroundColor: !selected ? theme.colors.white[0] : theme.colors.blue[0],
		borderColor: !selected ? theme.colors.white[0] : theme.colors.blue[5],
		borderRadius: "12px",
		padding: "12px",
		boxShadow: `4px 4px 12px 0px hsla(189, 75%, 75%, 0.25)`,
	},
}));

const CategoryCard = ({ children, selected, onSelect }: CategoryCardProps) => {
	const { classes } = useStyles({ selected });

	return (
		<Box className={classes.container}>
			<div onClick={onSelect}>{children}</div>
		</Box>
	);
};

export default CategoryCard;
