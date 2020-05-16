import queue from './assets/images/queue.png'
import kitchen from './assets/images/kitchen.png'
import web from './assets/images/web.png'

export const labels = ['Unfulfilled', 'Fulfilled']
export const backgroundColor = ['#dddddd', '#35a723']
export const hoverBackgroundColor = ['#dddddd', '#35a723']
export const recommendedServices = [{
    name: 'Queue Management',
    src: queue
}, {
    name: 'Kitchem Management',
    src: kitchen
}, {
    name: 'B2B e-Marketplace / e-Procurement',
    src: web
}]

export const stage1 = [
    // stage 1
    'Digital / Online Food Order',
    'Digital Payment',
    'e-Loyalty/ Customer Relationship Management',
    'Automated Reservation',
    'Wireless Self Collection',
    'Queue Management (HRMS)',
    'Kitchen Management (HRMS)',
    'Fleet Management System',
]
export const stage2 = [
    // stage 2
    'B2B e-Marketplace / e-Procurement',
    'Data Analytics Platform',
    'IoT-enabled Central Kitchen Management',
]

export const stage3 = [
    // stage 3
    'Sensing / Video Analytics for Restaurant Observation',
    'Immersive Training using AR / VR',
    'Predictive Ordering System powered by AI',
    'F&B Preparation / Cooking Robot',
    'Farm-to-Fork Food Trust Assurance',
    'Restaurant Layout Optimisation using AR / VR',
]