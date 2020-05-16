import React, { useState } from 'react'
import { makeStyles, Typography, Box, Paper, Dialog, Button, DialogTitle, DialogContent } from '@material-ui/core';
import { formRef, industryRef } from '../firebase'
import { useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2'
import { useHistory } from 'react-router';
import { backgroundColor, hoverBackgroundColor, labels, recommendedServices } from '../constants'
import AppointmentModal from '../components/modals/AppointmentModal';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundSize: 'cover',
        flexDirection: 'column'
    },
    chartWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    recommendationWrapper: {
        marginTop: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    recommendationHeader: {
        padding: 50,
        fontFamily: 'AirbnbCereal-Medium',
        fontSize: 25,
        textTransform: 'uppercase',
        textDecoration: 'underline'
    },
    recommendations: {
        width: '60%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    paper: {
        width: '30%',
        borderRadius: 0,
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        boxShadow: '3px 3px 10px 0px rgba(0,0,0,0.2);',
        position: 'relative',
        height: '100%',
        padding: 0,
        '&:hover': {
            boxShadow: '7px 7px 10px 0px rgba(0,0,0,0.7);',
        },
    },
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        height: '100%',
        width: '100%',
        opacity: 0,
        transition: '.5s ease',
        backgroundColor: 'rgba(0,0,0,0.7)',
        '&:hover': {
            cursor: 'default',
            opacity: 1,
            cursor: 'pointer'
        },
    },
    cardContent: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    },
    text: {
        fontFamily: 'AirbnbCereal-Book',
        fontWeight: '500',
        color: '#fff',
        fontSize: 18,
    },
}));

const Results = () => {
    const classes = useStyles()
    const [state, setState] = useState({})
    const [industry, setIndustry] = useState({})
    const [stage1, setStage1] = useState({})
    const [stage2, setStage2] = useState({})
    const [stage3, setStage3] = useState({})
    const [open, setOpen] = useState(false)
    const [selected, setSelected] = useState({})

    useEffect(() => {
        retrieveState()
    }, [])

    const handleOpen = (item) => {
        setSelected(item)
        setOpen(true)
    }

    const retrieveState = () => {
        formRef.on("value", snapshot => {
            if (snapshot.val() != null) {
                let data = Object.values(snapshot.val())[0]
                console.log(data)
                setState(data.state)
                industryRef.on("value", snapshot => {
                    if (snapshot.val() != null) {
                        let ind = Object.values(snapshot.val())
                        let industry = ind.filter(item => item.name === data.industry)[0]
                        let noStage1 = matchStages(industry.stage1, Object.keys(data.state))
                        let noStage2 = matchStages(industry.stage2, Object.keys(data.state))
                        let noStage3 = matchStages(industry.stage3, Object.keys(data.state))
                        setStage1({
                            labels,
                            datasets: [{
                                data: [industry.stage1.length - noStage1, noStage1],
                                backgroundColor,
                                hoverBackgroundColor
                            }]
                        })
                        setStage2({
                            labels,
                            datasets: [{
                                data: [industry.stage2.length - noStage2, noStage2],
                                backgroundColor,
                                hoverBackgroundColor
                            }]
                        })
                        setStage3({
                            labels,
                            datasets: [{
                                data: [industry.stage3.length - noStage3, noStage3],
                                backgroundColor,
                                hoverBackgroundColor
                            }]
                        })
                        setIndustry(industry)
                    }
                });
            }
        });
    }

    const matchStages = (ind, biz) => {
        let matches = 0
        for (let i = 0; i < ind.length; i++) {
            for (let j = 0; j < biz.length; j++) {
                if (ind[i] === biz[j]) {
                    matches++
                }
            }
        }
        return matches
    }

    return (
        <div className={classes.root}>
            <div className={classes.chartWrapper}>
                <div>
                    <h2>STAGE 1</h2>
                    <Doughnut data={stage1}
                        options={{
                            legend: false
                        }}
                    />
                </div>
                <div>
                    <h2>STAGE 2</h2>
                    <Doughnut data={stage2}
                        options={{
                            legend: false
                        }}
                    />
                </div>
                <div>
                    <h2>STAGE 3</h2>
                    <Doughnut data={stage3}
                        options={{
                            legend: false
                        }}
                    />
                </div>
            </div>
            <div>
                <div className={classes.recommendationWrapper}>
                    <div className={classes.recommendationHeader}>Recommended Services</div>
                    <div className={classes.recommendations}>
                        {
                            recommendedServices.map(item => {
                                return (
                                    <Paper className={classes.paper} onClick={() => handleOpen(item)}>
                                        <img src={item.src} style={{ objectFit: 'cover', width: '100%', height: 200, verticalAlign: 'top' }} />
                                        <Box className={classes.overlay}>
                                            <Box className={classes.cardContent}>
                                                <Typography className={classes.text}>
                                                    {item.name}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Paper>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            {open && <AppointmentModal open={open} close={() => setOpen(false)} item={selected} />}
        </div>
    )
}

export default Results