import React, { useEffect, useRef, useState, useCallback } from 'react';
// useRef, useCallback 사용
const About4 = () => {
    const [textTransform1, setTextTransform1] = useState(`translateX(${window.innerWidth}px)`);
    const [lineTransform1, setlineTransform1] = useState(`translateX(${window.innerWidth}px)`);
    const [iconTransform1, seticonTransform1] = useState('scale(0) rotate(0deg)');

    const [textTransform2, setTextTransform2] = useState(`translateX(${window.innerWidth}px)`);
    const [lineTransform2, setlineTransform2] = useState(`translateX(${window.innerWidth}px)`);
    const [iconTransform2, seticonTransform2] = useState('scale(0) rotate(0deg)');

    const [position, setPosition] = useState('');
    const [transform, setTransform] = useState('');
    //useRef 사용, 리렌더링 방지 , useState와 다르게 상태값이 변경되어도 리렌더링되지않음
    //스크롤되는 횟수
    const numRef = useRef(0);

    const handleScroll = useCallback((e) => {
        //브라우저별 휠 스크롤 방향 나타내는속성 => wheelDelta: Chrome, Firefox, IE11 / detail: firefox 
        // 스크롤의 방향을 감지 브라우저호환성 위해
        // wheelDelta는 아래= 음수값, 위= 양수값 (e.detail은 아래=양수, 위=음수값으로 반대방향으로 반환함) 
        // e.detail일 경우엔 * -1로 값을 반전시켜 e.wheelDelta과 방향을 일치시킴
        const delta = e.wheelDelta || e.detail * -1;

        //useRef.current값이 증가되거나 감소되어도 리렌더링X
        // 스크롤방향 '아래'이면서, numRef.current값이 50보다 작을때 1씩증가 
        if (delta < 0 && numRef.current !== 50) {
            numRef.current++;
            console.log('numRef.current:', numRef.current, 'numRef:', numRef)
            // 스크롤방향 '위'면서 numRef.current값이 0보다 클때 1씩 감소
        } else if (delta > 0 && numRef.current > 0) {
            numRef.current--;
            console.log("------감소중, numRef.current값", numRef.current)
        }

        const num = numRef.current;

        if (num >= 9) {
            console.log("------포지션 fixed------")
            setPosition('fixed');
            setTransform('translate(-50%, -50%)');
        }

        if (num >= 9 && num <= 15) {
            console.log("------텍스트 움직이기 시작------")
            setTextTransform1(`translateX(${window.innerWidth - (num - 9) * (window.innerWidth / 6)}px)`);
        }

        if (num >= 13 && num <= 19) {
            console.log("------밑줄 움직이기 시작------")
            setlineTransform1(`translateX(${window.innerWidth - (num - 13) * (window.innerWidth / 6)}px)`);
        }

        if (num >= 20 && num <= 24) {
            const scaleValue = 1 - ((24 - num) * 0.2);
            const rotateValue = (num - 20) * 45;
            seticonTransform1(`scale(${scaleValue}) rotate(${rotateValue}deg)`);
        } else if (num < 20) {
            seticonTransform1('scale(0) rotate(0deg)');
        }


        // block2

        if (num >= 25 && num <= 31) {
            console.log("------텍스트2 움직이기 시작------")
            setTextTransform2(`translateX(-${window.innerWidth - (num - 25) * (window.innerWidth / 6)}px)`);
        }

        if (num >= 29 && num <= 35) {
            console.log("------밑줄 움직이기 시작------")
            setlineTransform2(`translateX(-${window.innerWidth - (num - 29) * (window.innerWidth / 6)}px)`);
        }

        if (num >= 36 && num <= 40) {
            const scaleValue = 1 - ((40 - num) * 0.2);
            const rotateValue = (num - 36) * 45;
            seticonTransform2(`scale(${scaleValue}) rotate(${rotateValue}deg)`);
        } else if (num < 36) {
            seticonTransform2('scale(0) rotate(0deg)');
        }



    }, []);

    

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('wheel', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('wheel', handleScroll);
        };
    }, [handleScroll]);

    return (
        <div className="section-wrap about">
            <h2 className="about__title">About Me</h2>
            <div className="about__text" style={{ position, transform }}>
                <div className="about__block about__block--block1">
                    <p className="about__para" style={{ transform: textTransform1 }}>
                        "안녕하세요. 프론트엔드라는 새로운 꿈에 첫발을 내딛고자 하는 이소연입니다."
                    </p>
                    <span className="about__line" style={{ transform: lineTransform1 }} />
                    <span className="about__icon about__icon--1" style={{ transform: iconTransform1 }}>✨</span>
                </div>

                <div className="about__block about__block--block2">
                    <p className="about__para" style={{ transform: textTransform2 }}>저는 레이아웃을 디자인하고 CSS를 동적으로 바꾸어가는 과정이 재미있고 즐거워요!</p>
                    <span className="about__line" style={{ transform: lineTransform2 }}></span>
                    <span className="about__icon about__icon--2" style={{ transform: iconTransform2 }}>🌟</span>
                </div>

                {/* <div className="about__block about__block--block3">
                    <p className="about__block about__block--p3">이 즐거움을 바탕으로, 현재에 머무르지 않고 꾸준히 성장하는 개발자가 되고 싶습니다"</p>
                    <span className="about__line"></span>
                    <span className="about__icon about__icon--3">😊</span>
                </div> */}
            </div>
        </div>
    );
};

export default About4;
