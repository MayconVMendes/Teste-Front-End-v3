import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import {
  getPartners,
  deletePartner,
  updatePartner,
  createPartner,
  getPartnerId, // Importa a função para obter um parceiro por ID
} from "../services/Api";
import TablePartner from "../components/TablePartner";
import ModalPartner from "../components/ModalPartner";
import { toast } from "react-toastify";

function Partner() {
  const { user, saveUser } = useContext(UserContext);
  const navigate = useNavigate();
  const { page: currentPageParam } = useParams(); // Pega o número da página da URL
  const location = useLocation(); // Para redirecionar após o login
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(
    parseInt(currentPageParam) || 1
  );
  const [itemsPerPage] = useState(10); // Quantos itens por página
  const [currentItem, setCurrentItem] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false); // Estado para identificar se é criação ou edição
  const [searchId, setSearchId] = useState(""); // Estado para ID de pesquisa
  const [searchResult, setSearchResult] = useState(null); // Resultado da pesquisa

  useEffect(() => {
    // Verificar se o usuário já está logado
    if (!user) {
      // recuperar os dados do usuário do localStorage
      const storedUserData = localStorage.getItem("userData");

      if (storedUserData) {
        // Se tiver dados no localStorage, salvar no contexto
        const parsedUserData = JSON.parse(storedUserData);
        saveUser(parsedUserData);
      } else {
        // Se não tiver dados no localStorage, redirecionar para a página de login
        navigate(`/login`);
      }
    } else {
      // Se o usuário estiver logado, carregar os dados da página
      fetchData();
    }
  }, [user, saveUser, navigate, location]);

  // Função para buscar dados da API (retorna todos de uma vez)
  const fetchData = async () => {
    try {
      const partners = await getPartners();
      setData(partners);
    } catch (error) {
      console.error(error);
    }
  };

  // Função para buscar parceiro por ID
  const fetchPartnerById = async (id) => {
    try {
      const partner = await getPartnerId(id);
      setSearchResult(partner);
    } catch (error) {
      console.error(error);
      setSearchResult(null);
      toast.error("Erro ao buscar parceiro.");
    }
  };

  // Calcular os itens para a página atual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Função para deletar um item
  const handleDelete = async (id) => {
    try {
      await deletePartner(id);
      fetchData();
      setSearchResult(null);
      setSearchId("");
      toast.success("Parceiro excluido com sucesso!");
    } catch (error) {
      console.error(error);
    }
  };

  // Função para abrir o modal de criação
  const handleCreate = () => {
    setCurrentItem({
      name: "",
      description: "",
      repositoryGit: "",
      urlDoc: "",
      clients: [],
      projects: [],
    });
    setIsCreating(true);
    setModalIsOpen(true);
  };

  // Função para abrir o modal de edição
  const handleEdit = (item) => {
    setCurrentItem(item);
    setIsCreating(false);
    setModalIsOpen(true);
  };

  // Função para salvar as alterações no item
  const handleSave = async () => {
    try {
      if (isCreating) {
        await createPartner(currentItem);
        toast.success("Parceiro criado com sucesso!");
      } else {
        await updatePartner(currentItem.id, currentItem);
        setSearchResult(null);
        setSearchId("");
        toast.success("Parceiro alterado com sucesso!");
      }
      fetchData();
      setModalIsOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Erro ao salvar parceiro.");
    }
  };

  // Função para atualizar o estado do item no formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentItem((prevItem) => ({ ...prevItem, [name]: value }));
  };

  // Função para atualizar o estado dos clientes e projetos
  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setCurrentItem((prevItem) => ({
      ...prevItem,
      [name]: value.split(",").map((item) => item.trim()),
    }));
  };

  // Atualiza a URL quando a página é alterada
  const handlePageChange = (page) => {
    setCurrentPage(page);
    navigate(`/parceiro/${page}`);
  };

  // Função para buscar parceiro por ID ao clicar no botão
  const handleSearch = () => {
    if (searchId.trim() === "") {
      toast.warning("O campo ID é obrigatório.");
      return;
    } else {
      fetchPartnerById(searchId);
    }
  };

  return (
    <div className="partner">
      <h2>Parceiro, Página nº {currentPage}</h2>
      <button className="add" onClick={handleCreate}>
        Adicionar Novo Parceiro
      </button>

      {/* Campo e botão de pesquisa por ID */}
      <div className="search">
        <input
          type="text"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          placeholder="Pesquisar por ID"
        />
        <button onClick={handleSearch}>Buscar</button>
      </div>

      {/* Exibição do resultado da pesquisa */}
      {searchResult && (
        <div className="search-result">
          <h3>Resultado da Pesquisa:</h3>
          <TablePartner
            items={[searchResult]} // Mostra apenas o parceiro encontrado
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      )}

      {/* Tabela de exibição dos parceiros */}
      <TablePartner
        items={currentItems}
        onEdit={handleEdit}
        onDelete={handleDelete}
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />

      {/* Modal de Edição e Criação */}
      <ModalPartner
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        isCreating={isCreating}
        currentItem={currentItem}
        onChange={handleChange}
        onSave={handleSave}
        onCancel={() => setModalIsOpen(false)}
        onSelectChange={handleSelectChange}
      />
    </div>
  );
}

export default Partner;
