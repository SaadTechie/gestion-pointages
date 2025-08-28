import React, { useState, useEffect } from "react";
import api from "../../api/axiosConfig";
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  Select,
  VStack,
  HStack,
  Text,
  Divider,
  Spinner,
  Button,
} from "@chakra-ui/react";

interface Pointage {
  id: number;
  nom: string;
  prenom: string;
  idMachin: string;
  date: string;
  heure: string;
  statut: string;
}

interface Collaborateur {
  id: number;
  nom: string;
  prenom: string;
  idMachin: string;
  email: string;
  poste: string;
  active: boolean;
}

interface PageResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  number: number; 
  size: number;
}

const HistoriquePointages: React.FC = () => {
  const [pointages, setPointages] = useState<Pointage[]>([]);
  const [collaborateurs, setCollaborateurs] = useState<Collaborateur[]>([]);
  const [filterDate, setFilterDate] = useState("");
  const [filterMachineId, setFilterMachineId] = useState("");
  const [loading, setLoading] = useState(true);

  // pagination
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(()=> {
    setPage(0)
  }, [filterDate,filterMachineId])

  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const params: any = { page, size: 8 };
        if (filterDate) params.date = filterDate;
        if (filterMachineId) params.idMachin = filterMachineId;

        const [resPointages, resCollabs] = await Promise.all([
          api.get<PageResponse<Pointage>>("/pointages/all", { params }),
          api.get("/collaborateurs"),
        ]);

        setPointages(resPointages.data.content);
       setTotalPages(Math.max(resPointages.data.totalPages, 1));
        setCollaborateurs(resCollabs.data.content || []);
        
      } catch (err) {
        console.error("Erreur lors de la récupération :", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, filterDate, filterMachineId]); 


  const filteredData = pointages.filter((p) => {
    return (
      (filterDate === "" || p.date === filterDate) &&
      (filterMachineId === "" || p.idMachin === filterMachineId)
    );
  });
  

  return (
    <Box bg="#f7f7f7" minH="100vh" py={10} px={6}>
      <VStack spacing={6} align="start">
        <Heading size="lg" color="blue.800">
          Historique des Pointages
        </Heading>

        {/* Filtres */}
        <HStack spacing={4} w="full">
          <Box>
            <Text fontWeight="medium">Filtrer par date :</Text>
            <Input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              bg="white"
            />
          </Box>

          <Box>
            <Text fontWeight="medium">Filtrer par ID Machine :</Text>
            <Select
              placeholder="Toutes les machines"
              value={filterMachineId}
              onChange={(e) => setFilterMachineId(e.target.value)}
              bg="white"
            >
              {collaborateurs.map((collab) => (
                <option key={collab.id} value={collab.idMachin}>
                  {collab.idMachin} — {collab.nom} {collab.prenom}
                </option>
              ))}
            </Select>
          </Box>
        </HStack>

        <Divider />

        
        {loading ? (
          <Spinner size="xl" color="blue.500" alignSelf="center" />
        ) : (
          <>
            <Table variant="simple" bg="white" borderRadius="md" shadow="md">
              <Thead bg="blue.100">
                <Tr>
                  <Th>Nom</Th>
                  <Th>Prénom</Th>
                  <Th>ID Machine</Th>
                  <Th>Date</Th>
                  <Th>Heure</Th>
                  <Th>Statut</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((p) => (
                    <Tr key={p.id}>
                      <Td>{p.nom}</Td>
                      <Td>{p.prenom}</Td>
                      <Td>{p.idMachin}</Td>
                      <Td>{p.date}</Td>
                      <Td>{p.heure}</Td>
                      <Td
                        color={p.statut === "Entrée" ? "green.500" : "red.500"}
                        fontWeight="bold"
                      >
                        {p.statut}
                      </Td>
                    </Tr>
                  ))
                ) : (
                  <Tr>
                    
                    <Td colSpan={6} textAlign="center">
                      Aucun pointage trouvé.
                    </Td>
                  </Tr>
                )}
              </Tbody>
            </Table>

            
            <HStack spacing={4} mt={4} alignSelf="center">
              <Button
                onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
                isDisabled={page === 0}
              >
                <Box fontSize="4xl" color="blue.500" cursor="pointer">
                  ←
                </Box>
              </Button>
              <Text>
                Page {page + 1} sur {totalPages}
              </Text>
              <Button
                onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))}
                isDisabled={page >= totalPages - 1}
              >
               <Box fontSize="4xl" color="red.500" cursor="pointer">
                    →
                </Box>
              </Button>
            </HStack>
          </>
        )}
      </VStack>
    </Box>
  );
};

export default HistoriquePointages;
