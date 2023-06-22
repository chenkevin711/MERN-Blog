import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";

export default makeStyles(() => {
	const theme = useTheme();

	return {
		appBar: {
			borderRadius: 15,
			margin: "30px 0",
			display: "flex",
			flexDirection: "row",
			justifyContent: "center",
			alignItems: "center",
		},
		heading: {
			color: "purple",
		},
		image: {
			marginLeft: "15px",
		},
		[theme.breakpoints.down("sm")]: {
				mainContainer: {
						flexDirection: "column-reverse"
				}
		},
	}
})
