import React, { useState } from 'react'
import { TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, makeStyles, Radio } from '@material-ui/core'
import classNames from 'classnames'

const useStyles = makeStyles((theme) => ({
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
    header: {
        marginTop: 20,
        fontSize: 25,
        fontWeight: "bold",
        width: '80%',
        textAlign: "left",
        fontFamily: 'AirbnbCereal-Medium',
        color: '#474747'
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
}));

const BusinessInformationForm = (props) => {
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

export default BusinessInformationForm