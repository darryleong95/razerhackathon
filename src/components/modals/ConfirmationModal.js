import React from 'react'
import { Dialog, DialogContent, makeStyles, DialogTitle, Button } from '@material-ui/core'
import moment from 'moment'

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

const ConfirmationModal = (props) => {
    const { open, close, confirm, businessInfo, requestInfo } = props
    const classes = useStyles()

    const getAbsoluteMonths = (momentDate) => {
        var months = Number(momentDate.format("MM"));
        var years = Number(momentDate.format("YYYY"));
        return months + (years * 12);
    }


    return (
        <Dialog open={open} onClose={close} aria-labelledby="form-dialog-title">
            <DialogTitle style={{ paddingBottom: 0 }} id="form-dialog-title">
                <span style={{ fontSize: 20, fontFamily: 'AirbnbCereal-Medium', color: '#2a2a2a' }}>
                    Request Summary
                </span>
            </DialogTitle>
            <DialogContent style={{ paddingTop: 20 }}>
                <div className={classes.confirmationText}>
                    Company Name: <span className={classes.confirmationSubtext}>{businessInfo.name}</span>
                </div>
                <div className={classes.confirmationText}>
                    Company Age: <span className={classes.confirmationSubtext}>{getAbsoluteMonths(moment()) - getAbsoluteMonths(moment(businessInfo.regDate))} Months</span>
                </div>
                <div className={classes.confirmationText}>
                    Loan Term: <span className={classes.confirmationSubtext}>${requestInfo.amount}/ 1 Year</span>
                </div>
                <div className={classes.confirmationText}>
                    Reason for Loan: <span className={classes.confirmationSubtext}>{requestInfo.allocation}</span>
                </div>
                <div style={{ marginTop: 40, marginBottom: 20 }}>
                    <Button onClick={close} variant='contained' style={{ marginRight: 10 }}>
                        Cancel
                    </Button>
                    <Button onClick={confirm} variant='contained' style={{ backgroundColor: '#4fc234', color: 'white' }}>
                        Confim
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ConfirmationModal