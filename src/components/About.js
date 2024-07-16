import React, { useEffect, useRef, useState } from 'react';


const About = () => {
    const sectionRef = useRef(null);
    const [textTransform, setTextTransform] = useState(`translate3d(${window.innerWidth}px, 0, 0)`);
    const [lineTransform, setLineTransform] = useState(`translate3d(${window.innerWidth}px, 0, 0)`);
    const [iconTransform, setIconTransform] = useState('scale(0) rotate(0deg)');
    const [position, setPosition] = useState('');
    const [transform, setTransform] = useState('')
    let num = 0;
    useEffect(() => {
        const handleScroll = (e) => {
            //해당페이지에서 스크롤되는 횟수(모든요소가 서서히 나타나는)
            let idx = 0; // 해당페이지에서 다음페이지로 넘어갈때부터 카운트되는 스크롤횟수 (=페이지이동 작동시키기위한)
            //브라우저별 휠 스크롤양 나타내는속성 => wheelDelta: Chrome, Firefox, IE11 / detail: firefox 
            //브라우저별 스크롤이벤트 반환값의 의미가 달라서 detail값에 '* -1' 으로 방향을 일치시킴  
            let delta = e.wheelDelta || e.detail * -1; // 스크롤의 방향 판별

            // 스크롤을 내렸을때
            if (delta < 0) {
                console.log('스크롤다운')

                if (num !== 28) {
                    num++;
                    if (num >= 9) {
                        setPosition('fixed');
                        setTransform('translate(-50%, -50%)');
                    }

                    if (num >= 9 && num <= 15) {
                        console.log('텍스트 동작');
                        const newTransformValue = `translate3d(${window.innerWidth - (num - 9) * (window.innerWidth / 6)}px, 0, 0)`;
                        setTextTransform(newTransformValue);
                    }

                    if (num >= 13 && num <= 19) {
                        const newTransformValue = `translate3d(${window.innerWidth - (num - 13) * (window.innerWidth / 6)}px, 0, 0)`;
                        setLineTransform(newTransformValue)
                    }

                    if (num >= 20 && num <= 24) {
                        console.log('아이콘 동작하기');
                        const scaleValue = 1 - ((24 - num) * 0.2);
                        const rotateValue = (num - 20) * 45;
                        setIconTransform(`scale(${scaleValue}) rotate(${rotateValue}deg)`);
                    }

                    if (num < 20) {
                        setIconTransform('scale(0) rotate(0deg)');
                    }

                }

                // 스크롤을 올렸을때
            } else {
                if (num > 0) {
                    num--;
                    if (num < 9) {
                        setPosition('');
                        setTransform('');
                    }

                    if (num < 15 && num >= 9) {
                        const newTransformValue = `translate3d(${window.innerWidth - (num - 9) * (window.innerWidth / 6)}px, 0, 0)`;
                        setTextTransform(newTransformValue);
                    }

                    if (num < 19 && num >= 13) {
                        const newTransformValue = `translate3d(${window.innerWidth - (num - 13) * (window.innerWidth / 6)}px, 0, 0)`;
                        setLineTransform(newTransformValue);
                    }

                    if (num < 24 && num >= 20) {
                        const scaleValue = 1 - ((24 - num) * 0.2);
                        const rotateValue = (num - 20) * 45;
                        setIconTransform(`scale(${scaleValue}) rotate(${rotateValue}deg)`);
                    }

                    if (num < 20) {
                        setIconTransform('scale(0) rotate(0deg)');
                    }
                }
       
            }
        };

        window.addEventListener('wheel', handleScroll);

        return () => {
            console.log('컴포넌트가 언마운트되었습니다.');
            window.removeEventListener('wheel', handleScroll);
        };
    }, [num])
    return (
        <div className="section-wrap about" ref={sectionRef}>
            <h2 className="about__title">About Me</h2>

            <div className="about__text" style={{ position: position, transform: transform }}>
                <div className="about__block about__block--block1">
                    <p className="about__block about__block--p1" style={{ transform: textTransform }}>"안녕하세요. 프론트엔드라는 새로운 꿈에 첫발을 내딛고자 하는 이소연입니다.</p>
                    <span className="about__line" style={{ transform: lineTransform }} />
                    <span className="about__icon about__icon--1" style={{ transform: iconTransform }}>✨</span>
                </div>

                <div className="about__block about__block--block2">
                    <span className="about__icon about__icon--2">🌟</span>
                    <p className="about__block about__block--p3">저는 레이아웃을 디자인하고 CSS를 동적으로 바꾸어가는 과정이 재미있고 즐거워요!</p>
                    <span className="about__line"></span>
                </div>

                <div className="about__block about__block--block3">
                    <p className="about__block about__block--p3">이 즐거움을 바탕으로, 현재에 머무르지 않고 꾸준히 성장하는 개발자가 되고 싶습니다"</p>
                    <span className="about__line"></span>
                    <span className="about__icon about__icon--3">😊</span>
                </div>
            </div>
        </div>
    );
};

export default About;
