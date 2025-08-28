import { Box, Heading, Text } from "@chakra-ui/react";

const NotFound: React.FC = () => {
  return (
    <Box
      textAlign="center"
      py={20}
      px={6}
      bg="gray.50"
      minH="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Heading
        display="inline-block"
        as="h2"
        size="2xl"
        bgGradient="linear(to-r, red.600, red.900)"
        backgroundClip="text"
      >
        404
      </Heading>
      <Text fontSize="xl" mt={3} mb={2} fontWeight="semibold">
        Page non trouvée
      </Text>
      <Text color={"gray.600"} mb={6}>
        Désolé, la page que vous recherchez n’existe pas ou a été déplacée.
      </Text>

    </Box>
  );
};

export default NotFound;
