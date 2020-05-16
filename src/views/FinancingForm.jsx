import React, { useState } from 'react'
import { Button, makeStyles, TextField, FormControlLabel, Checkbox, FormControl, FormLabel, RadioGroup, Radio, Dialog, DialogContent, DialogActions, DialogTitle } from '@material-ui/core';
import FinanceFormImage from '../assets/images/piggy_bank.png'
import { useHistory } from 'react-router';
import classNames from 'classnames'

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        left: 0,
        right: 0,
        overflow: 'hidden'
    },
    form: {
        width: '60%',
        height: '70%',
        display: 'flex',
        flexDirection: 'row'
    },
    inputWrapper: {
        flex: 1,
        paddingTop: 30,
        paddingBottom: 30,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        boxShadow: '10px 10px 20px 0px rgba(0,0,0,0.1)',
        marginRight: 40,
    },
    wrap: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '95%',
        width: '100%',
    },
    wrapper: {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%',
        width: '100%',
    },
    input: {
        marginTop: 30,
        width: '80%',
    },
    vectorWrapper: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        marginTop: 20,
        fontSize: 25,
        fontWeight: "bold",
        width: '80%',
        textAlign: "left",
        fontFamily: 'AirbnbCereal-Medium',
        color: '#474747'
    },
    button: {
        fontSize: 15,
        zIndex: 1,
        width: '60%',
        height: 50,
        alignSelf: 'center',
        backgroundColor: '#4FC234',
        color: '#fff',
        fontFamily: 'AirbnbCereal-Bold',
        border: 'none',
        '&:hover': {
            backgroundColor: '#40A628'
        }
    },
    right: {
        zIndex: 0,
        opacity: 0,
        marginLeft: 100,
        transition: 'margin-left 1s, opacity 1s',
    },
    center: {
        zIndex: 10,
        opacity: 1,
        marginLeft: 0,
        transition: 'margin-left 1s, opacity 1s',
    },
    left: {
        zIndex: 0,
        opacity: 0,
        marginLeft: -100,
        transition: 'margin-left 1s, opacity 1s',
    },
    label: {
        fontFamily: 'AirbnbCereal-Book',
        fontSize: 14,
    },


    // dialog styles 
    dialogInput: {
        marginTop: 30,
        width: '100%',
        fontFamily: 'AirbnbCereal-Book',
        fontSize: 14,
    },
    firstInput: {
        marginTop: 20
    },


    // confirmation 
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

const FinancingForm = () => {
    const classes = useStyles()
    const [selected, setSelected] = useState(0)
    const [showSocial, setSocial] = useState(false)
    const [showConfirmation, setConfirmation] = useState(false)

    return (
        <div className={classes.root}>
            <div className={classes.form}>
                <div className={classes.vectorWrapper}>
                    <img src={FinanceFormImage} alt="signup" width={'80%'} />
                </div>
                <Form setSocial={setSocial} setConfirmation={() => setConfirmation(true)} />
            </div>
            {
                showSocial && <SocialModal open={showSocial} close={() => setSocial(false)} />
            }
            {
                showConfirmation && <Confirmation open={showConfirmation} close={() => setConfirmation(false)} />
            }

        </div>
    );
}

const Form = (props) => {
    const { next, setSocial, setConfirmation } = props
    const classes = useStyles()
    const [num, setNum] = useState(0)
    const history = useHistory()

    const handleClick = () => {
        if (num === 0) {
            setNum(num + 1)
        } else {
            // Show Dialog
            setConfirmation()
        }
    }

    return (
        <div className={classes.inputWrapper}>
            <div className={classes.wrap}>
                <BusinessInformation num={num} setSocial={setSocial} />
                <RequestInformation num={num} />
            </div>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <Button variant='contained' className={classes.button} onClick={() => handleClick()}>
                    {num != 1 ? 'Next' : 'Submit'}
                </Button>
            </div>
        </div>
    )
}

const BusinessInformation = (props) => {
    const { num, setSocial } = props
    const classes = useStyles()
    const [value, setValue] = useState('no');

    const handleChange = (event) => {
        setValue(event.target.value)
        console.log(event.target.value)
        setSocial(event.target.value == 'yes' ? true : false)
    };

    return (
        <div className={classNames(
            classes.wrapper,
            num === 0 && classes.center,
            (num === 1 || num === 2) && classes.left,
        )}>
            <div className={classes.header}>Company Information</div>
            <TextField variant="outlined" className={classes.input} label="Company name" InputLabelProps={{
                shrink: true,
            }} />
            <TextField variant='outlined' className={classes.input} label="Company Corp Pass ID" InputLabelProps={{
                shrink: true,
            }} />
            <TextField variant='outlined' className={classes.input} label="Company Registration Date" InputLabelProps={{
                shrink: true,
            }} />
            <TextField variant='outlined' className={classes.input} label="Company Registration City" InputLabelProps={{
                shrink: true,
            }} />
            <FormControl className={classes.input} component="fieldset">
                <FormLabel style={{ fontFamily: 'AirbnbCereal-Book', width: '100%', textAlign: 'left', color: '#2d2d2d', paddingBottom: 10 }} component="legend">
                    My Business is customer facing
                </FormLabel>
                <RadioGroup value={value} onChange={handleChange}>
                    <FormControlLabel classes={{ label: classes.label }} value="yes" control={<Radio style={{ color: '#4fc234', paddingTop: 5, paddingBottom: 5 }} />} label="yes" />
                    <FormControlLabel classes={{ label: classes.label }} value="no" control={<Radio style={{ color: '#4fc234', paddingTop: 5, paddingBottom: 5 }} />} label="no" />
                </RadioGroup>
            </FormControl>
        </div>
    )
}

const RequestInformation = (props) => {
    const { num } = props
    const classes = useStyles()
    const [value, setValue] = useState('shutdown');

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <div className={classNames(
            classes.wrapper,
            num === 0 && classes.right,
            num === 1 && classes.center,
            num === 2 && classes.left
        )}>
            <div className={classes.header}>Loan Request Details</div>
            <TextField type="number" placeholder="7,500" variant="outlined" className={classes.input} label="Request Value (SGD)" InputLabelProps={{
                shrink: true,
            }} />
            <TextField placeholder="Salaries: $5000, Rental: $2500 ..." rows={3} multiline variant='outlined' className={classes.input} label="Loan Allocation" InputLabelProps={{
                shrink: true,
            }} />
            <FormControl className={classes.input} component="fieldset">
                <FormLabel style={{ fontFamily: 'AirbnbCereal-Book', width: '100%', paddingBottom: 10, textAlign: 'left', color: '#2d2d2d' }} component="legend">
                    If the pandemic persists for 3 more months ...
                </FormLabel>
                <RadioGroup value={value} onChange={handleChange}>
                    <FormControlLabel classes={{ label: classes.label }} value="shutdown" control={<Radio style={{ color: '#4fc234' }} />} label="I would have to shut my business down" />
                    <FormControlLabel classes={{ label: classes.label }} value="loss" control={<Radio style={{ color: '#4fc234' }} />} label="I would be able to maintain my business at a loss" />
                    <FormControlLabel classes={{ label: classes.label }} value="standard" control={<Radio style={{ color: '#4fc234' }} />} label="I would be able to maintain my business as it" />
                    <FormControlLabel classes={{ label: classes.label }} value="grow" control={<Radio style={{ color: '#4fc234' }} />} label="I would be able to grow my business" />
                </RadioGroup>
            </FormControl>
        </div>
    )
}

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

const Confirmation = (props) => {
    const { open, close } = props
    const classes = useStyles()
    const history = useHistory()

    return (
        <Dialog open={open} onClose={close} aria-labelledby="form-dialog-title">
            <DialogTitle style={{ paddingBottom: 0 }} id="form-dialog-title">
                <span style={{ fontSize: 20, fontFamily: 'AirbnbCereal-Medium', color: '#2a2a2a' }}>
                    Request Summary
                </span>
            </DialogTitle>
            <DialogContent style={{ paddingTop: 20 }}>
                <div className={classes.confirmationText}>
                    Company Name: <span className={classes.confirmationSubtext}>Cafe De Luna</span>
                </div>
                <div className={classes.confirmationText}>
                    Company Age: <span className={classes.confirmationSubtext}>3 Year 4 Months</span>
                </div>
                <div className={classes.confirmationText}>
                    Loan Term: <span className={classes.confirmationSubtext}>$20,000 / 1 Year</span>
                </div>
                <div className={classes.confirmationText}>
                    Loan Payables: <span className={classes.confirmationSubtext}>Cafe De Luna</span>
                </div>
                <div className={classes.confirmationText}>
                    Receivables: <span className={classes.confirmationSubtext}>SGD 190,000</span>
                </div>
                <div className={classes.confirmationText}>
                    Reason for Loan: <span className={classes.confirmationSubtext}>Financing of Short Term liabilities</span>
                </div>
                <div style={{ marginTop: 40, marginBottom: 20 }}>
                    <Button onClick={close} variant='contained' style={{ marginRight: 10 }}>
                        Cancel
                    </Button>
                    <Button onClick={() => {
                        close()
                        history.push('/home')
                    }} variant='contained' style={{ backgroundColor: '#4fc234', color: 'white' }}>
                        Confim
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default FinancingForm