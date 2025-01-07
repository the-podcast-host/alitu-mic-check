import { Box, Link } from '@chakra-ui/react';
import { FaDownload } from 'react-icons/fa6';
import { Button } from './ui/button';

interface Props {
  blob: Blob;
}

const Downloader = ({ blob }: Props) => {
  const url = URL.createObjectURL(blob);
  const filename = 'Alitu Mic Check';
  const extension = blob.type.split('/').pop();

  return (
    <Box my={8}>
      <Link display="block" href={url} download={`${filename}.${extension}`}>
        <Button size="lg" width="100%" colorPalette="purple">
          <FaDownload />
          Download
        </Button>
      </Link>
    </Box>
  );
};

export default Downloader;
