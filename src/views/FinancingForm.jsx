import React, { useState } from 'react'
import { Button, makeStyles } from '@material-ui/core';
import FinanceFormImage from '../assets/images/piggy_bank.png'
import BusinessInformationForm from '../components/forms/BusinesssInformation';
import RequestInformationForm from '../components/forms/RequestInformationForm';
import SocialModal from '../components/modals/SocialModal';
import ConfirmationModal from '../components/modals/ConfirmationModal';

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
    vectorWrapper: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
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
}));

const FinancingForm = () => {
    const classes = useStyles()
    const [showSocial, setSocial] = useState(false)
    const [showConfirmation, setConfirmation] = useState(false)
    // const [businessInfo, setBusinessInfo] = useState({})
    // const [businessInfo, setBusinessInfo] = useState({})

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
                showConfirmation && <ConfirmationModal open={showConfirmation} close={() => setConfirmation(false)} />
            }

        </div>
    );
}

const Form = (props) => {
    const { setSocial, setConfirmation } = props
    const classes = useStyles()
    const [num, setNum] = useState(0)

    const handleClick = () => {
        if (num === 0) {
            setNum(num + 1)
        } else {
            setConfirmation()
        }
    }

    return (
        <div className={classes.inputWrapper}>
            <div className={classes.wrap}>
                <BusinessInformationForm num={num} setSocial={setSocial} />
                <RequestInformationForm num={num} />
            </div>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <Button variant='contained' className={classes.button} onClick={() => handleClick()}>
                    {num != 1 ? 'Next' : 'Submit'}
                </Button>
            </div>
        </div>
    )
}

export default FinancingForm