import { Box, Flex, Text, VStack, HStack, Divider } from "@chakra-ui/react";

const Footer: React.FC = () => {
  return (
    <Box bg="#B90E0A" color="gray.100" mt={10} boxShadow="lg">
      <Flex
        maxW="1200px"
        mx="auto"
        py={10}
        px={6}
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align={{ base: "start", md: "center" }}
        gap={10}
      >
        
        <VStack align="start" spacing={3} flex="1">
          <Text fontSize="2xl" fontWeight="bold" color="white">
            Royal Air Maroc
          </Text>
          <Text fontSize="sm" maxW="300px" color="gray.200" lineHeight="tall">
            Un outil simple, moderne et efficace pour suivre la présence et
            l'assiduité des collaborateurs.
          </Text>
        </VStack>

        
        <VStack align="start" spacing={2} flex="1">
          <Text fontWeight="semibold" color="white" mb={1}>
            Contact
          </Text>
          <Text fontSize="sm">✉ support@ram.com</Text>
          <Text fontSize="sm">☎ +212 5 22 48 97 00</Text>
          <Text fontSize="sm">📍 Casablanca, Maroc</Text>
        </VStack>
      </Flex>

      <Divider borderColor="whiteAlpha.400" />

      <HStack justify="center" py={4}>
        <Text fontSize="sm" color="gray.200">
          © {new Date().getFullYear()} Royal Air Maroc. Tous droits réservés.
        </Text>
      </HStack>
    </Box>
  );
};

export default Footer;
