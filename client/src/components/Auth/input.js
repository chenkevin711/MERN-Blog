import React from 'react'
import { TextField, Grid, InputAdornment, IconButton } from '@mui/material'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Input = ({ name, handleChange, label, half, autoFocus, type, handleShowPassword }) => {
    return (
        <Grid xs={12} md={half ? 6 : 12} style={{marginBottom: '10px'}}>
            <TextField 
                name={name}
                label={label}
                onChange={handleChange}
                variant='outlined'
                required
                fullWidth
                type={type}
                autoFocus={autoFocus}
                InputProps={name === 'password' ? {
                    endAdornment: (
                        <InputAdornment position="end">
                        <IconButton onClick={handleShowPassword}>
                            {type === 'password' ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                        </InputAdornment>
                    ),
                } : null}
            />
        </Grid>
    )
}

export default Input