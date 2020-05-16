import React, { useState, useEffect } from 'react'
import { makeStyles, TextField, FormControlLabel, Checkbox, Button } from '@material-ui/core'
import SignupImage from '../assets/images/online_protection_monochromatic.png'
import Slider from 'react-slick'
import { useHistory } from 'react-router'
import {
    DatePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers'
import moment from 'moment'
import DateFnsUtils from '@date-io/date-fns';
import Axios from 'axios'
import { userRef } from '../firebase'

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

/*
{
    "client": {
        "firstName": "Celeste",
        "lastName": "Goh",
        "assignedBranchKey": "8a8e878e71c7a4d70171ca5ea9b811d0"
    },
    "idDocuments": [
        {
            "identificationDocumentTemplateKey": "8a8e867271bd280c0171bf7e4ec71b01",
            "issuingAuthority": "Immigration Authority of Singapore",
            "documentType": "NRIC/Passport Number",
            "validUntil": "2021-09-12",
            "documentId": "S9812345A"
        }
    ]
}

*/

const Signup = () => {
    const classes = useStyles()
    const [selected, setSelected] = useState(0)

    return (
        <div className={classes.root}>
            <div className={classes.form}>
                <SignupForm />
                <div className={classes.vectorWrapper}>
                    <img src={SignupImage} alt="signup" width={'80%'} />
                </div>
            </div>
        </div>
    );
}

const SignupForm = () => {
    const classes = useStyles()
    const history = useHistory()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [validUntil, setValidUntil] = useState('')
    const [documentId, setDocumentId] = useState('')
    const [password, setPassword] = useState('')

    const createClientAccount = async () => {
        let date = moment(validUntil).format('YYYY-MM-DD')
        let req = {
            client: {
                firstName,
                lastName,
                assignedBranchKey: process.env.REACT_APP_MAMBU_BRANCH_ID
            },
            idDocuments: [
                {
                    identificationDocumentTemplateKey: process.env.REACT_APP_IDENTIFICATION_DOCUMENT_TEMPLATE_KEY,
                    issuingAuthority: "Immigration Authority of Singapore",
                    documentType: "NRIC/Passport Number",
                    validUntil: date,
                    documentId
                }
            ]
        }
        await Axios.post(process.env.REACT_APP_MAMBU_BASE_URL + 'clients', {
            ...req
        }, {
            auth: {
                username: process.env.REACT_APP_USERNAME,
                password: process.env.REACT_APP_PASSWORD
            }
        }).then(res => {
            // successful creation of client. create account on firebase as well
            var bcrypt = require('bcryptjs');
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(documentId, salt);
            userRef.push().set({
                nric: documentId,
                password: hash,
            }).then(() => {
                history.push('/home')
            }).catch(error => {
                console.log(error)
            });

        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <div className={classes.inputWrapper}>
            <div className={classes.wrapper}>
                <div className={classes.header}>Sign Up</div>
                <div className={classes.content}>
                    <TextField variant="outlined" className={classes.input} label="First Name" InputLabelProps={{
                        shrink: true,
                    }} value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    <TextField variant="outlined" className={classes.input} label="Last Name" InputLabelProps={{
                        shrink: true,
                    }} value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    <TextField variant="outlined" className={classes.input} label="NRIC" InputLabelProps={{
                        shrink: true,
                    }} value={documentId} onChange={(e) => setDocumentId(e.target.value)} />
                    <TextField
                        variant="outlined"
                        label="Passport Expiry Date"
                        type="date"
                        value={validUntil}
                        onChange={(e) => setValidUntil(e.target.value)}
                        className={classes.input}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField variant='outlined' className={classes.input} label="Password" type='password' InputLabelProps={{
                        shrink: true,
                    }} value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
            </div>
            <Button variant='contained' className={classes.button} onClick={createClientAccount}>
                Login
            </Button>
        </div>
    )
}


export default Signup