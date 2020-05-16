import React, { useState } from 'react'
import { makeStyles, TextField, FormControlLabel, Checkbox, Button, Hidden } from '@material-ui/core';
import ArrowImage from '../assets/images/arrow2.png'
import DigitalisationImage from '../assets/images/progress__monochromatic.png'
import { MdFace } from 'react-icons/md'
import { useHistory } from 'react-router';
import classNames from 'classnames'
import YouTube from 'react-youtube';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
        transition: 'background-color 1s',
        overflow: 'hidden'
    },
    titleWrapper: {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'red',
        width: '100%',
        top: '40%'
    },
    title: {
        fontFamily: 'AirbnbCereal-Medium',
        fontSize: 30,
        textAlign: 'center',
        transition: 'color 1s'
    },
    tabWrapper: {
        height: '100%',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    tabs: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        width: '70%',
        height: '80%',
    },
    tab: {
        backgroundColor: '#fff',
        paddingTop: 30,
        paddingBottom: 20,
        position: 'relative',
        bottom: '-95%',
        height: '100%',
        flex: 1,
        marginRight: 20,
        marginLeft: 20,
        transition: 'bottom 1s, padding-top 1s, padding-bottom 1s',
        boxShadow: '5px -10px 15px 0px rgba(0,0,0,0.2)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',

        '&:hover': {
            paddingTop: 60,
            paddingBottom: 40,
            bottom: '-20%',
            transition: 'bottom 1s, padding-top 1s, padding-bottom 1s',
            cursor: 'pointer'
        }
    },
    tabTitle: {
        textTransform: 'uppercase',
        fontSize: 30,
        fontFamily: 'AirbnbCereal-Medium',
        textAlign: 'center',
    },
    image: {
        paddingTop: 70,
        paddingBottom: 70
    },
    text: {
        width: '80%',
        borderRadius: 10,
        textAlign: 'center',
        fontFamily: 'AirbnbCereal-Medium',
        transition: 'background-color 1s',
        fontSize: 20,
    },
    textApply: {
        paddingTop: 20,
        paddingBottom: 20,
        borderRadius: 10,
        width: '50%',
        textAlign: 'center',
        fontFamily: 'AirbnbCereal-Medium',
        transition: 'background-color 1s',
        fontSize: 20,
        '&:hover': {
            backgroundColor: 'rgba(0,0,0,0.1)',
            transition: 'background-color 1s'
        }
    },
    textHover: {
        opacity: 0,
        transition: 'opacity 1s'
    },

    finInfo: {
        position: 'absolute',
        top: '50%',
        left: '25%',
        width: '20%',
    },
    finText: {
        opacity: 0,
        fontSize: 30,
        fontFamily: 'AirbnbCereal-Medium',
        textAlign: 'center',
        color: '#fff',
        zIndex: 1,
    },
    arrow: {
        marginTop: -10,
        height: 175,
        marginLeft: 200,
        opacity: 0
    },
    bringOut: {
        opacity: 1,
        transition: 'opacity 1s'
    }
}));

const Login = () => {
    const classes = useStyles()
    const [hoverFin, setHoverFin] = useState(false)
    const [hoverDigi, setHoverDigi] = useState(false)
    const history = useHistory()

    const goFinance = () => {
        history.push('/financing')
    }

    const goDigi = () => {
        history.push('/digitalisation-form')
    }

    const opts = {
        height: '375',
        width: '600',
        playerVars: {
            autoplay: 1,
        },
    };

    const _onReady = (event) => {
        event.target.pauseVideo();
    }

    return (
        <div className={classes.root} style={(hoverDigi || hoverFin) ? { backgroundColor: '#474747', transition: 'background-color 1s' } : { backgroundColor: '#fff' }}>
            <div className={classes.titleWrapper}>
                <MdFace size={40} color="darkorange" style={{ paddingBottom: 10 }} className={(hoverDigi || hoverFin) && classes.textHover} />
                <div className={classNames(classes.title, (hoverDigi || hoverFin) && classes.textHover)}>
                    I want to find out more about .... (Look Below!!)
                </div>
            </div>
            <div id="financing-info" className={classes.finInfo}>
                <div className={classNames(classes.finText, hoverFin && classes.bringOut)}>
                    Watch Our video to learn more about our new Loan!
                </div>
                <img src={ArrowImage} className={classNames(classes.arrow, hoverFin && classes.bringOut)} />
            </div>
            <div className={classes.tabWrapper}>
                <div className={classes.tabs}>
                    <div className={classes.tab} onMouseEnter={() => setHoverDigi(true)} onMouseLeave={() => setHoverDigi(false)} onClick={goDigi}>
                        <div className={classes.tabTitle}>Digitalisation</div>
                        <img src={DigitalisationImage} alt="digitalisation" width={'80%'} className={classes.image} />
                        <div className={classes.text}>Explore industry specific <span style={{ color: '#fc682d' }}>digitalisation</span> efforts tailored just for you!</div>
                    </div>
                    <div className={classes.tab} onMouseEnter={() => setHoverFin(true)} onMouseLeave={() => setHoverFin(false)} onClick={goFinance}>
                        <div className={classes.tabTitle}>Financing</div>
                        <div className={classes.image}>
                            <YouTube videoId="2g811Eo7K8U" opts={opts} onReady={_onReady} />
                        </div>
                        <div className={classes.textApply}>Click here to apply!</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login