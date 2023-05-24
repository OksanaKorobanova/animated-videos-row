import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import { Box, useMediaQuery } from '@mui/material';
import isTouchDevice from '../helpers/isTouchDevice';
import {
  INITIAL_VIDEO_WIDTH,
  ACTIVE_VIDEO_WIDTH,
} from '../constants/constants';

const styles = {
  videoBlock: {
    position: 'relative',
    width: { xs: '100%', md: INITIAL_VIDEO_WIDTH },
    maxWidth: { xs: '300px', sm: '500px', md: 'unset' },
    height: { xs: '300px', sm: '500px', md: '374px' },
    borderRadius: '9px',
    cursor: 'pointer',
    transition: 'width .4s cubic-bezier(.33,1,.68,1)',
  },
  coverBlock: {
    boxSizing: 'border-box',
    position: 'absolute',
    width: '100%',
    height: '100%',
    padding: '40px',
    zIndex: 1,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    textAlign: 'left',
    borderRadius: '9px',
  },
  title: {
    fontSize: '20px',
    lineHeight: '25px',
    fontWeight: 500,
    color: '#FFFFFF',
  },
  description: {
    fontSize: '12px',
    lineHeight: '15px',
    fontWeight: 400,
    color: '#FFFFFF',
  },
  videoWrapper: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
};

const Html5Video = ({
  item: { coverImg, title, description, videoUrl, mp4Video, webmVideo },
  showFullVideo,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const hasTouch = isTouchDevice();

  const playerRef = useRef();
  const coverRef = useRef();
  const playerContainerRef = useRef();

  // currentTime
  const playOnHover = () => {
    // 1. hideCoverImg
    coverRef.current.style.zIndex = 0;
    coverRef.current.style.opacity = 0;
    // 2. animate container
    playerContainerRef.current.style.width = ACTIVE_VIDEO_WIDTH;
    // 3. play video
    playerRef.current.play();
  };
  const onMouseLeave = () => {
    // 1. pause video and reset time
    playerRef.current.pause();
    playerRef.current.currentTime = 0;
    // 2. container
    playerContainerRef.current.style.width = INITIAL_VIDEO_WIDTH;
    // 3. show cover img
    coverRef.current.style.zIndex = 1;
    coverRef.current.style.opacity = 1;
  };

  return (
    <Box
      ref={playerContainerRef}
      sx={styles.videoBlock}
      onMouseEnter={isMobile || hasTouch ? undefined : () => playOnHover()}
      onMouseLeave={isMobile || hasTouch ? undefined : () => onMouseLeave()}
      onClick={() => showFullVideo(videoUrl)}>
      <Box
        ref={coverRef}
        sx={{
          ...styles.coverBlock,
          backgroundImage: `url(${coverImg || videoUrl})`,
        }}>
        <Box sx={styles.title}>{title}</Box>
        <Box sx={styles.description}>{description}</Box>
      </Box>

      {!isMobile && !hasTouch && (
        <Box sx={styles.videoWrapper}>
          <video
            ref={playerRef}
            playsInline
            loop
            muted
            preload='true'
            style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              objectFit: 'cover',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%,-50%)',
              borderRadius: '9px',
            }}>
            {mp4Video && <source type='video/mp4' src={mp4Video} />}
            {webmVideo && <source type='video/webm' src={webmVideo} />}
            Your browser does not support HTML5 video tag.
          </video>
        </Box>
      )}
    </Box>
  );
};

Html5Video.propTypes = {
  item: PropTypes.object.isRequired,
};

export default Html5Video;
