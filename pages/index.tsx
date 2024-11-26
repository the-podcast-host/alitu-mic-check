import Layout from '../components/Layout';
import { Heading, Container, Text } from '@chakra-ui/react';
const IndexPage = () => (
  <Layout>
    <Container centerContent maxW="lg">
      <Heading as="h1" size="6xl" paddingTop={16}>
        Mic Check
      </Heading>
      <Text textAlign="center" textStyle="lg" fontWeight="medium">
        Testing one two 🎤 Is this thing on? Let's make sure you're setup to
        sound your best!
      </Text>
    </Container>
  </Layout>
);

export default IndexPage;
