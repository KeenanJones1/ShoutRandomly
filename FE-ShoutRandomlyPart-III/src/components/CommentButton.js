import React from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'

export default ({ children, onClick, tip, btnClassName, tipClassName }) => (
    <Tooltip title={tip} className={tipClassName} color="#eceff1
    ">
        <IconButton onClick={onClick} className={btnClassName} color="#eceff1
">
            {children}
        </IconButton>
    </Tooltip>
)