import React from 'react'
import Intro from './Intro';
import About from './About';

export default function Main() {
    return (
        <>
            <div className="section intro"><Intro /></div>
            <div className="section about"><About /></div>
            <div className="section stack">stack</div>
            <div className="section portfolio">portfolio</div>
            <div className="section contact">contact</div>

        </>
    )
}

