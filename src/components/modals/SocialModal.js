import React from 'react'
import { Dialog, DialogTitle, DialogContent, TextField, Button, makeStyles } from '@material-ui/core';
import classNames from 'classnames'

const useStyles = makeStyles((theme) => ({
    dialogInput: {
        marginTop: 30,
        width: '100%',
        fontFamily: 'AirbnbCereal-Book',
        fontSize: 14,
    },
    firstInput: {
        marginTop: 20
    }
}));

const SocialModal = (props) => {
    const { open, close } = props
    const classes = useStyles()
    return (
        <Dialog open={open} onClose={close} aria-labelledby="form-dialog-title">
            <DialogTitle style={{ paddingBottom: 0 }} id="form-dialog-title">
                <span style={{ fontSize: 20, fontFamily: 'AirbnbCereal-Medium', color: '#2a2a2a' }}>
                    Social Media Details (If applicable)
                </span>
                <div style={{ fontFamily: 'AirbnbCereal-book', color: '#6f6f6f', fontSize: 14, paddingTop: 10 }}>
                    *By providing us with your social media accounts, you consent to us using the information shared online for our analysis
                </div>
            </DialogTitle>
            <DialogContent style={{ paddingTop: 20 }}>
                <TextField
                    className={classNames(classes.dialogInput, classes.firstInput)}
                    autoFocus
                    placeholder='https://www.linkedin.com/company/razer/'
                    id="linkedIn"
                    label="LinkedIn"
                    type="text"
                    fullWidth
                    variant='outlined'
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    className={classes.dialogInput}
                    autoFocus
                    placeholder='https://www.facebook.com/razer/'
                    id="facebook"
                    label="Facebook Page"
                    type="text"
                    fullWidth
                    variant='outlined'
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    className={classes.dialogInput}
                    autoFocus
                    placeholder='https://www.instagram.com/razer/'
                    id="instagram"
                    label="Instagram"
                    type="text"
                    fullWidth
                    variant='outlined'
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    className={classes.dialogInput}
                    autoFocus
                    placeholder='https://twitter.com/Razer'
                    id="twitter"
                    label="Twitter"
                    type="text"
                    fullWidth
                    variant='outlined'
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <div style={{ marginTop: 40, marginBottom: 20 }}>
                    <Button onClick={close} variant='contained' style={{ marginRight: 10 }}>
                        Cancel
                    </Button>
                    <Button onClick={close} variant='contained' style={{ backgroundColor: '#4fc234', color: 'white' }}>
                        Confim
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default SocialModal