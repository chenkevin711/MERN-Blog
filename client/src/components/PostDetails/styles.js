import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";

export default makeStyles(() => {
    const theme = useTheme()

    return {
        media: {
            borderRadius: '20px',
            objectFit: 'cover',
            width: '100%',
            maxHeight: '600px',
        
        },
        card: {
            display: 'flex',
            width: '100%',
            flexDirection: 'column-reverse',
            [theme.breakpoints.down('sm')]: {
            flexWrap: 'wrap',
            flexDirection: 'column',
            },
        },
        section: {
            borderRadius: '20px',
            margin: '10px',
            flex: 1,
        },
        imageSection: {
            marginLeft: '20px',
            [theme.breakpoints.down('sm')]: {
            marginLeft: 0,
            },
        },
        loadingPaper: {
            display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', borderRadius: '15px', height: '39vh',
        },
    }
})