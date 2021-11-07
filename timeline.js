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
            <p className="text-xs text-white text-opacity-75 font-mlp">A whitelist process will be established to ensure all velas punks early adopters can mint.</p>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot className="bg-green"/>
          <TimelineConnector className="bg-white"/>
        </TimelineSeparator>
        <TimelineContent><p className="text-green font-mlp">whitelist</p></TimelineContent>
      </TimelineItem>
      <TimelineItem>
      <TimelineOppositeContent>
            <p className="text-xs text-white text-opacity-75 font-mlp">A presale will be available only for whitelisted users.</p>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot className="bg-white"/>
          <TimelineConnector className="bg-white"/>
        </TimelineSeparator>
        <TimelineContent><p className="text-white font-mlp">Presale</p></TimelineContent>
      </TimelineItem>
      <TimelineItem>
      <TimelineOppositeContent>
            <p className="text-xs text-white text-opacity-75 font-mlp">Randomly generated punks can be minted by everyone. Velasian Twitter PFPs will never be the same.</p>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot className="bg-white"/>
          <TimelineConnector className="bg-white"/>
        </TimelineSeparator>
        <TimelineContent><p className="text-white font-mlp">public sale</p></TimelineContent>
      </TimelineItem>
      {/* <TimelineItem>
      <TimelineOppositeContent className="text-xs text-white text-opacity-75 font-mlp">
            Text
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot className="bg-white"/>
          <TimelineConnector className="bg-white"/>
        </TimelineSeparator>
        <TimelineContent className="text-white font-mlp">Marketplace</TimelineContent>
      </TimelineItem> */}
      {/* <TimelineItem >
        <TimelineSeparator>
          <TimelineDot className="bg-white"/>
          <TimelineConnector className="bg-white"/>
        </TimelineSeparator>
        <TimelineContent className="text-white font-mlp">DAO</TimelineContent>
      </TimelineItem> */}
      <TimelineItem>
      <TimelineOppositeContent>
            <p className="text-xs text-white text-opacity-75 font-mlp">Velas Punks will have its own marketplace where everyone can trade velas punks.</p>
        </TimelineOppositeContent>
      
        <TimelineSeparator >
          <TimelineDot className="bg-white"/>
        </TimelineSeparator>
        <TimelineContent><p className="text-white font-mlp">Marketplace</p></TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}