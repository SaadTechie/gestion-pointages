import {
  Box,
  Heading,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  VStack,
  Flex,
  useColorModeValue,
  Spinner,
} from "@chakra-ui/react";
import { FaUsers, FaCalendarCheck, FaUserTimes } from "react-icons/fa";
import { useEffect, useState } from "react";
import type { ReactElement } from "react";
import api from "../../api/axiosConfig"; 

type StatCardProps = {
  title: string;
  value: string | number;
  icon: ReactElement;
};

const StatCard = ({ title, value, icon }: StatCardProps) => {
  return (
    <Stat
      p={5}
      shadow="md"
      border="1px solid"
      borderColor="gray.200"
      borderRadius="lg"
      bg="white"
    >
      <Flex justify="space-between">
        <Box>
          <StatLabel fontWeight="bold" color="gray.600">
            {title}
          </StatLabel>
          <StatNumber color="red.700">{value}</StatNumber>
        </Box>
        <Box fontSize="3xl" color="red.500">
          {icon}
        </Box>
      </Flex>
    </Stat>
  );
};

type DashboardStats = {
  totalUtilisateurs: number;
  pointagesAujourdhui: number;
  absences: number;
};

type DernierPointage = {
  date: string;
  nbPointages: number;
};

const DashboardAdmin = () => {
  const bg = useColorModeValue("gray.50", "gray.800");

  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [dernierPointages, setDernierPointages] = useState<DernierPointage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        
        const statsRes = await api.get<DashboardStats>("/dashboard/stats");
        const pointagesRes = await api.get<DernierPointage[]>("/dashboard/derniers-pointages", {
          params: { limit: 3 }, 
        });

        setStats(statsRes.data);
        setDernierPointages(pointagesRes.data);
      } catch (err) {
        console.error("Erreur chargement dashboard", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <Flex justify="center" align="center" minH="100vh">
        <Spinner size="xl" color="red.600" />
      </Flex>
    );
  }

  return (
    <Box p={8} bg={bg} minH="100vh">
      <Heading mb={6} color="red.700">
        Tableau de bord Cotidienne
      </Heading>

      {stats && (
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={10}>
          <StatCard
            title="Collaborateurs"
            value={stats.totalUtilisateurs}
            icon={<FaUsers />}
          />
          <StatCard
            title="Présences"
            value={stats.pointagesAujourdhui}
            icon={<FaCalendarCheck />}
          />
          <StatCard
            title="Absences"
            value={stats.absences}
            icon={<FaUserTimes />}
          />
        </SimpleGrid>
      )}

      <Box
        p={6}
        bg="white"
        shadow="md"
        borderRadius="lg"
        border="1px solid"
        borderColor="gray.200"
      >
        <Heading as="h2" size="md" mb={4} color="red.700">
          Derniers pointages
        </Heading>

        <VStack align="start" spacing={3}>
          {dernierPointages.map((dp, idx) => (
            <Text key={idx}>
              ✔️ {dp.date} - {dp.nbPointages } pointages
            </Text>
          ))}
        </VStack>
      </Box>
    </Box>
  );
};

export default DashboardAdmin;
