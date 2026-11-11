import React from 'react';
import {Composition} from 'remotion';
import {Preview} from './video';
import {TIMELINE} from './vang/timeline';
import {ChuyenDong} from './chuyen-dong';
import {TuongTac} from './tuong-tac';
export const Root: React.FC = () => <><Composition id="VangShortPreview" component={Preview} fps={30} width={720} height={1280} durationInFrames={800}/><Composition id="VangShort" component={Preview} fps={30} width={720} height={1280} durationInFrames={TIMELINE.durationInFrames}/><Composition id="VangChuyenDong" component={ChuyenDong} fps={30} width={720} height={1280} durationInFrames={TIMELINE.durationInFrames}/><Composition id="VangTuongTac" component={TuongTac} fps={30} width={720} height={1280} durationInFrames={TIMELINE.durationInFrames}/></>;
