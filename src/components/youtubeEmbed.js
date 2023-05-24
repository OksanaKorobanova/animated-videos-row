import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

const styles = {
  videoContainer: {
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
};

const YoutubeEmbed = ({ embedId }) => (
  <Box sx={styles.videoContainer}>
    <iframe
      src={`https://www.youtube.com/embed/${embedId}`}
      frameBorder='0'
      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
      allowFullScreen
    />
  </Box>
);

YoutubeEmbed.propTypes = {
  embedId: PropTypes.string.isRequired,
};

export default YoutubeEmbed;
