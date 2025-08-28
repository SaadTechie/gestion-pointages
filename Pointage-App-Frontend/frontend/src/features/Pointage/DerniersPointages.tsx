import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Spinner,
  useToast,
  Center,
} from "@chakra-ui/react";

interface JourPointage {
  date: string;
  heureEntree: string | null;
  heureSortie: string | null;
}


interface DerniersPointagesProps {
  idMachin: string;
  refreshKey: number;
}
const formatHeure = (h : string | null) : string => {
  if(!h) return "-";
  return h.slice(0,5);
}
const getDateAujourdhui = (): string => {
  const d = new Date();
  return d.toLocaleDateString("fr-CA"); 
};

const DerniersPointages: React.FC<DerniersPointagesProps> = ({ idMachin, refreshKey }) => {
  const [pointages, setPointages] = useState<JourPointage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();
  const dateAujourdhui = getDateAujourdhui();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/pointages/${idMachin}/derniers`);

        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const data: JourPointage[] = await response.json();
        setPointages(data);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Erreur inconnue";
        setError(message);
        toast({
          title: "Erreur",
          description: message,
          status: "error",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [idMachin, toast, refreshKey]); 

  return (
    <Box p={5} borderWidth="1px" borderRadius="lg">
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Derniers pointages
      </Text>

      {loading ? (
        <Center>
          <Spinner size="lg" />
        </Center>
      ) : error ? (
        <Text color="red.500">Erreur : {error}</Text>
      ) : pointages.length === 0 ? (
        <Center>
          <Text color="gray.500">
            Aucun pointage trouvé pour ce collaborateur
          </Text>
        </Center>
      ) : (
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Date</Th>
              <Th>Heure d'entrée</Th>
              <Th>Heure de sortie</Th>
              <Th>Statut</Th>
            </Tr>
          </Thead>
          <Tbody>
            {pointages.map((pointage, index) => (
              <Tr key={index}>
                <Td>{pointage.date}</Td>
                <Td>{formatHeure(pointage.heureEntree) || "—"}</Td>
                <Td>{formatHeure(pointage.heureSortie) || "—"}</Td>
                <Td color={pointage.heureSortie ? "green.500" : pointage.date === dateAujourdhui ?"orange":"red"}>
                  {pointage.heureSortie ? "Complété" : pointage.date === dateAujourdhui ? "En cours" : "Pointage Manqué"}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Box>
  );
};

export default DerniersPointages;
