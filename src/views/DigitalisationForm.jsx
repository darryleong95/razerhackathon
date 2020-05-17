import React, { useState, useRef } from 'react'
import { makeStyles, Button, FormControl, InputLabel, Select, MenuItem, RadioGroup, FormControlLabel, Radio, Checkbox } from '@material-ui/core'
import Slider from 'react-slick';
import classNames from 'classnames'
import ConsultingImage from '../assets/images/consulting_monochromatic.png'
import { AiOutlineArrowRight } from 'react-icons/ai'
import { useHistory } from 'react-router';
import { formRef, industryRef } from '../firebase'
import { stage1, stage2, stage3 } from '../constants';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f6f6f6'
    },
    image: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        width: 350,
        opacity: 1,
        transition: 'opacity 1s'
    },
    form: {
        height: '50%',
        width: '60%',
        boxShadow: '10px 10px 20px 0px rgba(0,0,0, 0.2)',
        backgroundColor: 'white'
    },
    slider: {
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    questionWrapper: {
        height: '100%',
        marginTop: 50,
        outline: 'none',
    },
    questionTitle: {
        fontSize: 30,
        fontFamily: 'AirbnbCereal-Medium',
        textAlign: 'center',
    },
    formControl: {
        marginTop: 40,
        width: '20%'
    },
    radioFormControl: {
        marginTop: 20,
        width: '50%'
    },
    label: {
        fontFamily: 'AirbnbCereal-Book',
        fontSize: 16,
    },
    checkBoxWrapper: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
    },
    checkboxControl: {
        marginTop: 20,
        width: '80%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    nextButton: {
        borderRadius: '50%',
        padding: 10,
        transition: 'background-color 1s',
        '&:hover': {
            cursor: 'pointer',
            backgroundColor: 'rgba(68,214,45,0.2)',
            transition: 'background-color 1s'
        }
    }
}));

const DigitalisationForm = () => {
    const classes = useStyles()
    const slider = useRef(null);
    const [current, setCurrent] = useState(0)
    const [industry, setIndustry] = useState('')
    const [numEmployees, setNumEmployess] = useState(0)
    const [operatingRevenue, setOperatingRevenue] = useState(-2)
    const [digitalisationStage, setDigitalisationStage] = useState('')
    const [state, setState] = useState({})
    const history = useHistory()

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        swipe: false,
        arrows: false,
    }

    const transition = (last) => {
        if (!last) {
            setTimeout(function () {
                slider.current.slickGoTo(current + 1)
                setCurrent(current + 1)
            }, 200)
        } else {
            // save submission data

            // let activities = stage1.concat(stage2).concat(stage3)
            // let selected = []
            // for (let i = 0; i < activities.length; i++) {
            //     for (let j = 0; j < Object.keys(state).length; j++) {
            //         if (activities[i] === Object.keys(state)[j]) {
            //             selected.push(i)
            //         }
            //     }
            // }


            formRef.push().set({
                industry,
                numEmployees,
                operatingRevenue,
                digitalisationStage,
                state: state,
            }).then(() => {
                history.push('/digitalisation-form/submit')
            }).catch(error => {
                console.log(error)
            });
        }
    }

    const handleCheck = (item) => {
        if (item in state) {
            delete state[item]
        } else {
            state[item] = true
        }
    }

    return (
        <div className={classes.root}>
            <div className={classes.form}>
                <img src={ConsultingImage} className={classes.image} />
                <Slider className={classes.slider} {...settings} ref={slider}>
                    <div className={classes.questionWrapper}>
                        <div className={classes.questionTitle}>
                            What Industry are you in?
                        </div>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={industry}
                                onChange={(e) => {
                                    setIndustry(e.target.value)
                                    transition()
                                }}
                            >
                                <MenuItem value={'Food and Beverages'}>Food and Beverages</MenuItem>
                                <MenuItem value={'Manufacturing'}>Manufacturing</MenuItem>
                                <MenuItem value={'Retail'}>Retail</MenuItem>
                                <MenuItem value={'Healthcare'}>Healthcare</MenuItem>
                                <MenuItem value={'IT Services'}>IT Services</MenuItem>
                                <MenuItem value={'Automotive'}>Automotive</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div className={classes.questionWrapper}>
                        <div className={classes.questionTitle}>
                            How many employees do you have in your company?
                            </div>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={numEmployees}
                                onChange={(e) => {
                                    setNumEmployess(e.target.value)
                                    transition()
                                }}
                            >
                                <MenuItem value={10}>{'<'} 10</MenuItem>
                                <MenuItem value={20}>{'<'} 20</MenuItem>
                                <MenuItem value={50}>{'<'} 50</MenuItem>
                                <MenuItem value={100}>{'<'} 100</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div className={classes.questionWrapper}>
                        <div className={classes.questionTitle}>
                            What is your current Operating Revenue (Monthly)
                            </div>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={operatingRevenue}
                                onChange={(e) => {
                                    setOperatingRevenue(e.target.value)
                                    transition()
                                }}
                            >
                                <MenuItem value={-1}>Negative</MenuItem>
                                <MenuItem value={1000}>$0 {'<'} $1000</MenuItem>
                                <MenuItem value={10000}>$1000 {'<'} $10000</MenuItem>
                                <MenuItem value={50000}>$10000 {'<'} $50000</MenuItem>
                                <MenuItem value={100000}>$50000 {'<'} $100000</MenuItem>
                                <MenuItem value={100001}>{'>'} $100000</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div className={classes.questionWrapper}>
                        <div className={classes.questionTitle}>
                            Which statement bests represents your SME?
                        </div>
                        <FormControl variant="outlined" className={classes.radioFormControl}>
                            <RadioGroup value={digitalisationStage} onChange={(e) => {
                                setDigitalisationStage(e.target.value)
                                transition()
                            }}>
                                <FormControlLabel classes={{ label: classes.label }} value={'0'}
                                    control={<Radio style={{ color: '#4fc234' }} />} label="I have attempted digitalisation in my company"
                                />
                                <FormControlLabel classes={{ label: classes.label }} value={'1'}
                                    control={<Radio style={{ color: '#4fc234' }} />} label="I have not attempted digitalisation in my company"
                                />
                            </RadioGroup>
                        </FormControl>
                    </div>
                    <div
                        className={classes.questionWrapper}>
                        <div className={classes.questionTitle}>
                            My Company currently uses (stage 1 of 3)...
                        </div>
                        <div className={classes.checkBoxWrapper}>
                            <FormControl variant="outlined" className={classes.checkboxControl}>
                                {
                                    stage1.map(item => {
                                        return (
                                            <div style={{ marginLeft: 20, display: 'flex', flexDirection: 'row', alignItems: 'center', width: '30%' }}>
                                                <Checkbox value={item} style={{ color: "#4fc234" }} onChange={() => handleCheck(item)} />
                                                <span style={{ textAlign: 'left' }} className={classes.label}>{item}</span>
                                            </div>
                                        )
                                    })
                                }
                            </FormControl>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <div style={{ width: '80%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                                <AiOutlineArrowRight size={25} className={classes.nextButton} onClick={() => {
                                    transition()
                                }} />
                            </div>
                        </div>
                    </div>
                    <div
                        className={classes.questionWrapper}>
                        <div className={classes.questionTitle}>
                            My Company currently uses (stage 2 of 3)...
                        </div>
                        <div className={classes.checkBoxWrapper}>
                            <FormControl variant="outlined" className={classes.checkboxControl}>
                                {
                                    stage2.map(item => {
                                        return (
                                            <div style={{ marginLeft: 20, display: 'flex', flexDirection: 'row', alignItems: 'center', width: '30%' }}>
                                                <Checkbox value={item} style={{ color: "#4fc234" }} onChange={() => handleCheck(item)} />
                                                <span style={{ textAlign: 'left' }} className={classes.label}>{item}</span>
                                            </div>
                                        )
                                    })
                                }
                            </FormControl>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <div style={{ width: '80%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                                <AiOutlineArrowRight size={25} className={classes.nextButton} onClick={() => {
                                    transition()
                                }} />
                            </div>
                        </div>
                    </div>
                    <div
                        className={classes.questionWrapper}>
                        <div className={classes.questionTitle}>
                            My Company currently uses (stage 3 of 3)...
                        </div>
                        <div className={classes.checkBoxWrapper}>
                            <FormControl variant="outlined" className={classes.checkboxControl}>
                                {
                                    stage3.map(item => {
                                        return (
                                            <div style={{ marginLeft: 20, display: 'flex', flexDirection: 'row', alignItems: 'center', width: '30%' }}>
                                                <Checkbox value={item} style={{ color: "#4fc234" }} onChange={() => handleCheck(item)} />
                                                <span style={{ textAlign: 'left' }} className={classes.label}>{item}</span>
                                            </div>
                                        )
                                    })
                                }
                            </FormControl>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <div style={{ width: '80%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                                <AiOutlineArrowRight size={25} className={classes.nextButton} onClick={() => {
                                    transition(true)
                                }} />
                            </div>
                        </div>
                    </div>
                </Slider>
            </div>
        </div >
    )
}

export default DigitalisationForm