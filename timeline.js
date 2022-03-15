import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';

export default function AlternateTimeline() {
  return (
    <Timeline position="alternate">
      <TimelineItem>
      <TimelineOppositeContent>
            <div className="p-2 text-xs text-white text-opacity-75 md:text-sm bg-black-light font-mlp">
            <p>This is our pre-launch stage, the mint is open and we start an important marketing phase to make our project known.</p>
            <p>We will need each of our soldiers to get the message out, Avalanche needs its army, get involved!</p>
            </div>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot className="bg-pink-mekaverse"/>
          <TimelineConnector className="bg-white"/>
        </TimelineSeparator>
        <TimelineContent><p className="text-xl text-pink-mekaverse font-mlp">1. Propaganda</p></TimelineContent>
      </TimelineItem>
      <TimelineItem>
      <TimelineOppositeContent>
        <div className="p-2 text-xs text-white text-opacity-75 md:text-sm bg-black-light font-mlp">
            <p>One week before the release of our video game,
              we will launch the knives stacking and the final version of our APP so that you can get familiar with the interface.</p>
            <p>You will start to produce your locked $LGCY that you will then be able to unlock via our video game. Learn more about the mechanics of Knives Legacy in our <a className='underline' href="https://docs.knives-legacy.com" rel="noreferer" target="_blank">whitepaper</a> </p>
        </div>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot className="bg-white"/>
          <TimelineConnector className="bg-white"/>
        </TimelineSeparator>
        <TimelineContent><p className="text-xl text-white font-mlp">2. NFT Staking & APP launch</p></TimelineContent>
      </TimelineItem>
      <TimelineItem>
      <TimelineOppositeContent>
        <div className="p-2 text-xs text-white text-opacity-75 md:text-sm bg-black-light font-mlp">
            <p>We are launching our P2E, the release is estimated for early April.</p>
            <p>Complete missions, equip your soldier, increase your equipment and your score and unlock more and more $LGCY produced by your NFT staking.</p>
            <p>Once unlocked, place your LGCY in farms with huge APR and drastically increase your income.</p>
          </div>

        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot className="bg-white"/>
          <TimelineConnector className="bg-white"/>
        </TimelineSeparator>
        <TimelineContent><p className="text-xl text-white font-mlp">3. Knives Legacy P2E launch</p></TimelineContent>
      </TimelineItem>
      <TimelineItem>
      <TimelineOppositeContent className="text-xs text-white text-opacity-75 font-mlp">
        <div className="p-2 text-xs text-white text-opacity-75 md:text-sm bg-black-light font-mlp">
            <p>Soon after our launch, we will release our native marketplace.Allowing you to trade every single collectible of our game in LGCY and get 5% royalties on every sale.This will further increase your passive income.</p>
          </div>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot className="bg-white"/>
          <TimelineConnector className="bg-white"/>
        </TimelineSeparator>
        <TimelineContent><p className="text-xl text-white font-mlp">4. Native Marketplace</p></TimelineContent>
      </TimelineItem>
      {/* <TimelineItem >
        <TimelineSeparator>
          <TimelineDot className="bg-white"/>
          <TimelineConnector className="bg-white"/>
        </TimelineSeparator>
        <TimelineContent className="text-white font-mlp">DAO</TimelineContent>
      </TimelineItem> */}
      <TimelineItem>
      <TimelineOppositeContent>
        <div className="p-2 text-xs text-white text-opacity-75 md:text-sm bg-black-light font-mlp">
            <p>Our next big project, scheduled for Q2 2022, which will allow you to reuse your $LGCY is our strategy game. Pay your entry fee in LGCY, create your military base, increase its infrastructure and your army, and conquer a map. The winning military coalition will share 80% of the common pot, 20% will go to the project treasury.</p>
        
          </div>
        </TimelineOppositeContent>
      
        <TimelineSeparator >
          <TimelineDot className="bg-white"/>
        </TimelineSeparator>
        <TimelineContent><p className="text-xl text-white font-mlp">5. LGCY Strategy game</p></TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}