import axios from "axios";

const BASE_URL_COMPANIES =
  "https://655cf25525b76d9884fe3153.mockapi.io/v1/external-companies";
const BASE_URL_PARTNER =
  "https://644060ba792fe886a88de1b9.mockapi.io/v1/test/partners";

// Função para buscar todas as empresas
export const getCompanies = async () => {
  try {
    const response = await axios.get(BASE_URL_COMPANIES);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    throw error;
  }
};

// Função para buscar uma empresa
export const getCompanieId = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL_COMPANIES}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    throw error;
  }
};

// Função para deletar uma empresa
export const deleteCompany = async (id) => {
  try {
    await axios.delete(`${BASE_URL_COMPANIES}/${id}`);
  } catch (error) {
    console.error("Erro ao deletar:", error);
    throw error;
  }
};

// Função para editar uma empresa
export const updateCompany = async (id, updatedData) => {
  try {
    await axios.put(`${BASE_URL_COMPANIES}/${id}`, updatedData);
  } catch (error) {
    console.error("Erro ao editar:", error);
    throw error;
  }
};

// Função para criar uma empresa
export const createCompany = async (createData) => {
  try {
    await axios.post(BASE_URL_COMPANIES, createData);
  } catch (error) {
    console.error("Erro ao criar:", error);
    throw error;
  }
};

// Função para buscar todos os parceiros
export const getPartners = async () => {
  try {
    const response = await axios.get(BASE_URL_PARTNER);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    throw error;
  }
};

// Função para buscar um parceiro
export const getPartnerId = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL_PARTNER}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    throw error;
  }
};

// Função para deletar um parceiro
export const deletePartner = async (id) => {
  try {
    await axios.delete(`${BASE_URL_PARTNER}/${id}`);
  } catch (error) {
    console.error("Erro ao deletar:", error);
    throw error;
  }
};

// Função para editar um parceiro
export const updatePartner = async (id, updatedData) => {
  try {
    await axios.put(`${BASE_URL_PARTNER}/${id}`, updatedData);
  } catch (error) {
    console.error("Erro ao editar:", error);
    throw error;
  }
};

// Função para criar um parceiro
export const createPartner = async (createData) => {
  try {
    await axios.post(BASE_URL_PARTNER, createData);
  } catch (error) {
    console.error("Erro ao criar:", error);
    throw error;
  }
};
