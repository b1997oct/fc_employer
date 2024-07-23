'use client'
import React, { useState, useEffect } from 'react';
import moment from 'moment';

export default function CountDown({ targetDate, Wrapper, onCountDownEnd }) {

    const [timeLeft, setTimeLeft] = useState(null);

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = moment();
            const target = moment(targetDate);
            const duration = moment.duration(target.diff(now));

            setTimeLeft({
                days: duration.days(),
                hours: duration.hours(),
                minutes: duration.minutes(),
                seconds: duration.seconds(),
            });
            if (duration.asSeconds() <= 0) {
                onCountDownEnd && onCountDownEnd();
                clearInterval(intervalId);
            }
        };

        const intervalId = setInterval(calculateTimeLeft, 1000);
        return () => clearInterval(intervalId);
    }, [targetDate]);

    if (!timeLeft) {
        return
    }
    if (Wrapper) {
        return <Wrapper {...timeLeft} />
    }

    return <Wrap {...timeLeft} />

};

function Wrap({ days, hours, minutes, seconds }) {
    return `${days ? days + 'd:' : ''}${hours? hours + 'h:':''}${minutes}m:${seconds}sec`
}