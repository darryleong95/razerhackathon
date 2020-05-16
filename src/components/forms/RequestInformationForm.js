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
    right: {
        zIndex: 0,
        opacity: 0,
        marginLeft: 100,
        transition: 'margin-left 1s, opacity 1s',
    },
}));

const RequestInformationForm = (props) => {
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

export default RequestInformationForm