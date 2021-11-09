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
            <div className="p-2 text-sm text-white text-opacity-75 bg-black-light font-mlp">
              <p>100% of the knives are minted. The army is deployed. We told you it was long term, didn't we? So hang in there.</p>
              <p>We start a lottery process happening every month, during 6 months. Keep your fingers crossed to be lucky and get the winning ticket</p>
            </div>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot className="bg-pink-mekaverse"/>
          <TimelineConnector className="bg-white"/>
        </TimelineSeparator>
        <TimelineContent><p className="text-xl text-pink-mekaverse font-mlp">1. Launch</p></TimelineContent>
      </TimelineItem>
      <TimelineItem>
      <TimelineOppositeContent>
        <div className="p-2 text-sm text-white text-opacity-75 bg-black-light font-mlp">
            <p>We have already started recruiting a team during the minting process.It's time to put all  these beautiful people to work! Webdev, back and front dev, gamedev, web3 dev, artist .. hop hop hop! You will already have the first visuals of the game , and a preview of the first features.</p>
            <p>Meanwhile, the lottery will keep going on. New lucky winners will be picked!</p>
        </div>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot className="bg-white"/>
          <TimelineConnector className="bg-white"/>
        </TimelineSeparator>
        <TimelineContent><p className="text-xl text-white font-mlp">2. The videogame process</p></TimelineContent>
      </TimelineItem>
      <TimelineItem>
      <TimelineOppositeContent>
        <div className="p-2 text-sm text-white text-opacity-75 bg-black-light font-mlp">
            <p>At the same time, the Legacy Foundation will finally begin its action. After recruiting a committee of experienced users. Foundation will start to read the first ideas. Analyze, sort and vote ... in order to keep only one!</p>
            <p>A promising idea will therefore be chosen , supported and financed to become a real project.</p>
            <p>We will ensure that all knife holders benefit from each of the projects supported by the foundation.</p>
          </div>

        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot className="bg-white"/>
          <TimelineConnector className="bg-white"/>
        </TimelineSeparator>
        <TimelineContent><p className="text-xl text-white font-mlp">3. The Legacy Foundation</p></TimelineContent>
      </TimelineItem>
      <TimelineItem>
      <TimelineOppositeContent className="text-xs text-white text-opacity-75 font-mlp">
        <div className="p-2 text-sm text-white text-opacity-75 bg-black-light font-mlp">
            <p>We aim to release a first version of the video game 4 months after building the dedicated team.</p>
            <p>Obviously, to deliver quickly and well, the game will not yet be ready at the end of its development. But a first draft, playable where you can customize your character, equip it and send it on a mission to earn exclusive NFTs will be released.</p>
            <p>As we progress you will get previews of the design and the content of the game. Do not let your knife fall, we do not accept deserter in our army!</p>
          </div>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot className="bg-white"/>
          <TimelineConnector className="bg-white"/>
        </TimelineSeparator>
        <TimelineContent className="text-xl text-white font-mlp">4. Knives Legacy videogame</TimelineContent>
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
        <div className="p-2 text-sm text-white text-opacity-75 bg-black-light font-mlp">
            <p>The first projects of the foundation will emerge. New ideas will be chosen and supported. Nothing will stop the benefits of owning a knife in your wallet.</p>
            <p>A finalized version of the game will arrive a few months later.</p>
            <p>What does the future hold for our army ?</p>
          </div>
        </TimelineOppositeContent>
      
        <TimelineSeparator >
          <TimelineDot className="bg-white"/>
        </TimelineSeparator>
        <TimelineContent><p className="text-xl text-white font-mlp">5. To infinity and beyond!</p></TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}