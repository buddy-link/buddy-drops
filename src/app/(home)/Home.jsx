"use client";

import React, { useEffect } from 'react';
import {
  _home, _float, _label, _buy, _step,
  _select, _input, _add, _reduce, _tickets,
  _rewards, _nft, _sol, _timer, _countdown,
  _period, _number, _share, _pause, _section,
  _results, _claim, _nav, _prev, _current, _next,
  _padding, _success, _connect, _disconnect, _max,
  _error, _username
} from './Home.styled.js';
import {ERROR_MAX_TICKETS, PHASE_PUBLIC_SALE, PHASE_WAIT, PHASE_WHITELIST, REWARD_NFT} from 'buddy.drops';
import { useBuddyDrops } from "buddy.drops";
import useRefs from "../../lib/hooks/useRefs";
import {useWallet, useConnection} from "@solana/wallet-adapter-react";
import {useWalletModal} from "@solana/wallet-adapter-react-ui";

const Home = () => {
  const { connection } = useConnection()
  const { publicKey, connected, disconnect } = useWallet()
  const { setVisible } = useWalletModal();
  const { step, prevStep, nextStep, timer,
    pause, value, rewards, inputProps,
    reduceTickets, addTickets, tickets, buyTickets,
    errors, onChange, onBlur, username, nextPhase,
    phase
  } = useBuddyDrops();
  const min_step = 1;
  const max_step = 5;
  const min_tickets = 1;
  const max_tickets = 5;

  const refs = useRefs(5);

  useEffect(() => {
    if (refs[step]?.current) {
      const sectionTop = refs[step].current.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = sectionTop - 40;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  }, [step]);

  const maxTicketsError = errors.find(error => error.type === ERROR_MAX_TICKETS);

  return (
    <_home>
      <_section>
        <_float>
          <_label $first>
            STEP 0
          </_label>
        </_float>
        <_step $first>
          <_connect onClick={() => {if (!publicKey) setVisible('true')}}>
            {publicKey ? 'Connected!' : 'Connect Wallet'}
            <_username>
            </_username>
          </_connect>
          <_disconnect $active={publicKey} onClick={() => disconnect()}>
            Disconnect
          </_disconnect>
        </_step>
      </_section>
      <_section ref={refs[1]} $active={step === 1}>
        <_float>
          <_label $first>
            STEP 1
          </_label>
        </_float>
        <_step $first>
          <_select>
            <_reduce onClick={() => reduceTickets(min_tickets)}>
              -
            </_reduce>
            <_input>
              <input {...inputProps} onChange={e => onChange(e, min_tickets, max_tickets - tickets)}/>
            </_input>
            <_add onClick={() => addTickets(max_tickets)}>
              +
            </_add>
          </_select>
          <_buy onClick={() => buyTickets(+value, max_tickets).then(() => nextStep(max_step))}>
            Buy Tickets
          </_buy>
          {maxTicketsError ?
            <_error>
              {maxTicketsError.message}
            </_error> :
            <_max>
              Maximum tickets {max_tickets - tickets}
            </_max>
          }
        </_step>
      </_section>
      <_section ref={refs[2]} $active={step === 2}>
        <_float>
          <_label>
            STEP 2
          </_label>
        </_float>
        <_step>
          <_timer $first>
            <_countdown>
              <_number>
                {timer.hours}
              </_number>
              <_period>
                hour{timer.hours > 1 ? 's' : ''}
              </_period>
            </_countdown>
            <_countdown>
              <_number>
                {timer.minutes}
              </_number>
              <_period>
                minute{timer.minutes > 1 ? 's' : ''}
              </_period>
            </_countdown>
            <_countdown>
              <_number>
                {timer.seconds}
              </_number>
              <_period>
                second{timer.seconds > 1 ? 's' : ''}
              </_period>
            </_countdown>
          </_timer>
          <_tickets>
            You have <b>{tickets}</b> Ticket{tickets > 1 ? 's' : ''}
          </_tickets>
          <_share onClick={() => nextPhase()}>
            Next Phase
          </_share>
        </_step>
      </_section>
      <_section ref={refs[3]} $active={step === 3}>
        <_float>
          <_label>
            STEP 3
          </_label>
        </_float>
        <_step>
          <_pause>
            Please wait while we distribute all rewards...
          </_pause>
          <_timer>
            <_countdown>
              <_number>
                {pause.hours}
              </_number>
              <_period>
                hour{pause.hours > 1 ? 's' : ''}
              </_period>
            </_countdown>
            <_countdown>
              <_number>
                {pause.minutes}
              </_number>
              <_period>
                minute{pause.minutes > 1 ? 's' : ''}
              </_period>
            </_countdown>
            <_countdown>
              <_number>
                {pause.seconds}
              </_number>
              <_period>
                second{pause.seconds > 1 ? 's' : ''}
              </_period>
            </_countdown>
          </_timer>
          <_pause>
            You may receive compressed NFTs or SOL near the end of this
            wait period, you may need to redeem NFT rewards on the next page...
          </_pause>
        </_step>
      </_section>
      <_section ref={refs[4]} $active={step === 4}>
        <_float>
          <_label>
            STEP 4
          </_label>
        </_float>
        <_step>
          <_results>
            You have <b>{rewards?.total}</b> Rewards
          </_results>
          <_rewards>
            <_nft>
              NFT
            </_nft>
            <_nft>
              NFT
            </_nft>
            <_sol>
              2 SOL
            </_sol>
          </_rewards>
          <_claim>
            Claim Rewards
          </_claim>
        </_step>
      </_section>
      <_section ref={refs[5]} $active={step === 5}>
        <_float>
          <_label>
            STEP 5
          </_label>
        </_float>
        <_step>
          <_success>
            Welcome to the Gogonauts Community!
          </_success>
        </_step>
      </_section>
      <_padding/>
      <_nav>
        <_prev onClick={() => prevStep(min_step)} $active={step > min_step}>
          Previous
        </_prev>
        <_current>
          <b>Step {step}</b>
          <span>{phase === PHASE_WHITELIST ?
                'Whitelist' : phase === PHASE_PUBLIC_SALE ?
                'Public Sale' : 'Waiting...'}</span>
        </_current>
        <_next onClick={() => nextStep(max_step)} $active={step < max_step}>
          Next
        </_next>
      </_nav>
    </_home>
  );
};

export default Home;
