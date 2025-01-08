import { Box, Link } from '@chakra-ui/react';
import { FiDownload } from 'react-icons/fi';
import { Button } from './ui/button';

interface Props {
  blob: Blob;
}

const Downloader = ({ blob }: Props) => {
  const url = URL.createObjectURL(blob);
  const filename = 'Alitu Mic Check';

  const match = blob.type.match(/audio\/([^;]+)/);
  const extension = match?.[1] ?? '';

  return (
    <Box my={8}>
      <Link display="block" href={url} download={`${filename}.${extension}`}>
        <Button size="lg" width="100%" colorPalette="purple">
          <FiDownload />
          Download
        </Button>
      </Link>
    </Box>
  );
};

export default Downloader;
