"use client";

import { useBuddyState} from "../../../../packages/drops/src/buddy";
import {
  ACTIVE_PHASE,
  DROPS_ERRORS,
  DROPS_LOADING,
  DROPS_SCHEDULE,
  ERROR_MAX_TICKETS, MOCK_DEBUG,
  PHASE_CLAIM,
  PHASE_PUBLIC_SALE,
  PHASE_WAIT,
  PHASE_WHITELIST, REWARD_NFT, REWARD_SOL,
  REWARDS_EARNED,
  TICKETS_OWNED,
  TICKETS_SELECTED, TICKETS_SOLD,
  USER_STEP
} from "../../../lib/state";
import {useEffect, useState} from "react";
import usePrevious from "../../../../packages/drops/src/buddy/usePrevious";

const calculateTimeLeft = (endTime) => {
  const now = new Date();
  const timeLeft = endTime - now;

  if (timeLeft <= 0) {
    return { hours: 0, minutes: 0, seconds: 0 };
  }

  const hours = Math.floor(timeLeft / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  return { hours, minutes, seconds };
};

export const useBuddyDrops = () => {
  const [value, setValue] = useBuddyState(TICKETS_SELECTED);
  const [step, setStep] = useBuddyState(USER_STEP);
  const [rewards, setRewards] = useBuddyState(REWARDS_EARNED);
  const [sold, setSold] = useBuddyState(TICKETS_SOLD);
  const [tickets, setTickets] = useBuddyState(TICKETS_OWNED);
  const [errors, setErrors] = useBuddyState(DROPS_ERRORS);
  const [loading, setLoading] = useBuddyState(DROPS_LOADING);
  const [schedule, setSchedule] = useBuddyState(DROPS_SCHEDULE);
  const [mock, setMock] = useBuddyState(MOCK_DEBUG);
  const [phase, setPhase] = useBuddyState(ACTIVE_PHASE);

  const prevPhase = usePrevious(phase);
  const [timer, setTimer] = useState(calculateTimeLeft(schedule.endPublic));
  const [pause, setPause] = useState(calculateTimeLeft(schedule.startClaim));

  // Mock timer change based on phase times
  useEffect(() => {
    if (mock) {
      const intervalId = setInterval(() => {
        setTimer(calculateTimeLeft(schedule.endPublic));
        setPause(calculateTimeLeft(schedule.startClaim));
      }, 1000);

      // Cleanup interval on component unmount
      return () => clearInterval(intervalId);
    }
  }, [schedule.endPublic, schedule.startClaim]);


  // Mock Phase Change and Generate Rewards
  useEffect(() => {
    if (mock && prevPhase !== PHASE_CLAIM && phase === PHASE_CLAIM) {

      const generateRewards = length => (Array.from({ length },
        () => Math.random() < 0.5 ? REWARD_NFT : REWARD_SOL));

      const next_rewards = generateRewards(tickets);

      setRewards(next_rewards);
    }
  }, [phase]);

  const onChange = (e, min_tickets, max_tickets) => {
    const next_value = +e.target.value;

    if (+next_value >= min_tickets && +next_value <= max_tickets || !next_value) setValue(next_value);
  };

  const onBlur = (e, min_tickets) => {
    if (!e.target.value) setValue(min_tickets);
  };

  const buyTickets = async (amount, max_tickets) => {
    const next_total = tickets + amount;
    if (next_total < max_tickets) {
      setTickets(next_total);
    }
    else setErrors([...errors, {
      type: ERROR_MAX_TICKETS,
      message: `You want too many tickets! (${next_total}/${max_tickets})`
    }]);
  };

  return {
    step,
    prevStep: (min_steps) => {
      if (step > min_steps) setStep(step - 1);
    },
    nextStep: (max_steps) => {
      if (step < max_steps) setStep(step + 1);
    },
    addTickets : (max_tickets) => {
      if (value < max_tickets) setValue(value + 1);
    },
    reduceTickets : (min_tickets) => {
      if (value > min_tickets) setValue(value - 1);
    },
    nextPhase: () => {
      if (phase === PHASE_WHITELIST) setPhase(PHASE_PUBLIC_SALE);
      if (phase === PHASE_PUBLIC_SALE) setPhase(PHASE_WAIT);
      if (phase === PHASE_WAIT) setPhase(PHASE_CLAIM);
    },
    value,
    errors,
    rewards,
    sold,
    timer,
    pause,
    tickets,
    buyTickets,
    onChange,
    onBlur,
    phase,
    inputProps: {
      value
    }
  };
};