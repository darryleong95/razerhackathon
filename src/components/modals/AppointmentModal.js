import React from 'react'
import { Dialog, DialogTitle, DialogContent, Button, makeStyles } from '@material-ui/core'
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
    confirmationText: {
        paddingTop: 20,
        paddingBottom: 20,
        fontSize: 17,
        fontFamily: 'AirbnbCereal-Book'
    },
    confirmationSubtext: {
        fontFamily: 'AirbnbCereal-Medium',
        paddingLeft: 10
    }
}));

const AppointmentModal = (props) => {
    const { open, close, item } = props
    const history = useHistory()
    const classes = useStyles()

    return (
        <Dialog open={open} onClose={close} aria-labelledby="form-dialog-title">
            <DialogTitle style={{ paddingBottom: 0 }} id="form-dialog-title">
                <span style={{ fontSize: 20, fontFamily: 'AirbnbCereal-Medium', color: '#2a2a2a' }}>
                    Make an appointment for:
                </span>
            </DialogTitle>
            <DialogContent style={{ paddingTop: 20 }}>
                <div className={classes.confirmationText}>
                    <span className={classes.confirmationSubtext}>{item.name}</span>
                </div>
                <div style={{ marginTop: 40, marginBottom: 20 }}>
                    <Button onClick={() => {
                        close()
                        alert('Your Request has been successfully made, your request is being processed. Our truted vendor will contact you within the next 3 working days')
                        history.push('/home')
                    }} variant='contained' style={{ backgroundColor: '#4fc234', color: 'white' }}>
                        Confim
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default AppointmentModal