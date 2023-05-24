import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Dialog, IconButton, useMediaQuery } from '@mui/material';
import YoutubeEmbed from '../components/youtubeEmbed';
import Html5Video from '../components/html5Video';

const styles = {
  section: {
    padding: { xs: '40px 18px', sm: '100px 96px' },
    backgroundColor: 'white',
  },
  container: {
    position: 'relative',
    width: '100%',
    maxWidth: '1248px',
    margin: { xs: 'unset', md: '0 auto' },
    overflowX: { xs: 'scroll', md: 'unset' },
    scrollBehavior: 'smooth',
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    gap: { xs: '12px', md: '40px' },
    justifyContent: { xs: 'unset', md: 'center' },
    alignItems: 'center',
    width: { xs: '924px', sm: '1224px', md: '100%' },
  },
  fullVideContainer: {
    overflow: 'hidden',
    paddingBottom: '56.25%',
    position: 'relative',
    height: 0,
    cursor: 'pointer',
    '& iframe': {
      left: 0,
      top: 0,
      height: '100%',
      width: '100%',
      position: 'absolute',
    },
  },
  dialog: {
    backgroundColor: 'rgba(0,0,0,0.25)',
    backdropFilter: 'saturate(80%) blur(20px)',

    '& .MuiPaper-root': {
      flexDirection: 'column',
      justifyContent: 'center',
      height: { xs: '100%', md: 'unset' },
      backgroundColor: 'unset',
    },
  },
  closeBtn: {
    position: 'absolute',
    top: '15px',
    right: '15px',
    color: 'white',
    border: '1px solid white',
  },
};

const VideoGallery = ({ items = [] }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [fullVideo, setFullVideo] = useState(null);
  const showFullVideo = (embedCode) => {
    setFullVideo(embedCode);
  };
  const closeFullVideo = () => {
    setFullVideo(null);
  };

  return (
    <Box sx={styles.section} component='section'>
      <Box sx={styles.container}>
        <Box sx={styles.content}>
          {items.map((item) => {
            return (
              <Html5Video
                key={item.title}
                item={item}
                showFullVideo={showFullVideo}
              />
            );
          })}
        </Box>
      </Box>
      {!!fullVideo && (
        <Dialog
          fullScreen={isMobile}
          fullWidth
          maxWidth='md'
          open
          onClose={closeFullVideo}
          sx={styles.dialog}>
          {isMobile && (
            <IconButton sx={styles.closeBtn} onClick={closeFullVideo}>
              <CloseIcon />
            </IconButton>
          )}
          <YoutubeEmbed embedId={fullVideo} />
        </Dialog>
      )}
    </Box>
  );
};

VideoGallery.propTypes = {
  items: PropTypes.array.isRequired,
};

export default VideoGallery;
