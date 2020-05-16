import React, { useState } from 'react'
import { makeStyles, TextField, FormControlLabel, Checkbox, Button } from '@material-ui/core';
import SignupImage from '../assets/images/online_protection_monochromatic.png'
import Slider from 'react-slick';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    form: {
        width: '60%',
        height: '40%',
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
        justifyContent: 'flex-start',
        boxShadow: '10px 10px 20px 0px rgba(0,0,0,0.1)',
        marginRight: 40,
    },
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        height: '100%'
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
        fontSize: 25,
        fontWeight: "bold",
        textAlign: "center",
        fontFamily: 'AirbnbCereal-Medium',
        color: '#474747'
    },
    content: {
        marginTop: 20,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    button: {
        width: '60%',
        height: 50,
        alignSelf: 'center',
        backgroundColor: '#4FC234',
        color: '#fff',
        fontFamily: 'AirbnbCereal-Bold',
        marginBottom: 10,
        border: 'none',
        '&:hover': {
            backgroundColor: '#40A628'
        }
    }
}));

const Login = () => {
    const classes = useStyles()
    const [selected, setSelected] = useState(0)

    return (
        <div className={classes.root}>
            <div className={classes.form}>
                <LoginForm />
                <div className={classes.vectorWrapper}>
                    <img src={SignupImage} alt="signup" width={'80%'} />
                </div>
            </div>
        </div>
    );
}

const LoginForm = () => {
    const classes = useStyles()
    const [checked, setCheck] = useState(false)
    const history = useHistory()

    return (
        <div className={classes.inputWrapper}>
            <div className={classes.wrapper}>
                <div className={classes.header}>Sign In</div>
                <div className={classes.content}>
                    <TextField variant="outlined" className={classes.input} label="Username" InputLabelProps={{
                        shrink: true,
                    }} />
                    <TextField variant='outlined' className={classes.input} label="Password" type='password' InputLabelProps={{
                        shrink: true,
                    }} />
                </div>
                {/* <div className={classes.input}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={checked}
                                style={{
                                    color: '#40A628',
                                    marginRight: 10
                                }}
                                onChange={() => setCheck(!checked)}
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                            />
                        }
                        label={<span style={{ fontSize: 14 }}>I agree to the <span style={{ fontFamily: 'AirbnbCereal-Bold', color: '#40A628' }}>Privacy Policy</span> and the processing of my personal data</span>}
                    />
                </div> */}
            </div>
            <Button variant='contained' className={classes.button} onClick={() => history.push("/home")}>
                Login
            </Button>
        </div>
    )
}


export default Login