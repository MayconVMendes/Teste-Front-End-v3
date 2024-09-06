import Modal from "react-modal";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

Modal.setAppElement("#root"); // Define o elemento raíz para acessibilidade

function ModalPartner({
  isOpen,
  onRequestClose,
  isCreating,
  currentItem,
  onChange,
  onSelectChange,
  onSave,
  onCancel,
}) {
  const handleSave = () => {
    // Verificação básica para garantir que todos os campos obrigatórios estão preenchidos
    const requiredFields = ["name", "description", "repositoryGit", "urlDoc"];
    const isValid = requiredFields.every(
      (field) => currentItem[field] && currentItem[field].trim() !== ""
    );

    if (isValid) {
      onSave();
    } else {
      toast.warning("Por favor, preencha todos os campos obrigatórios.");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel={isCreating ? "Criar Novo Parceiro" : "Editar Parceiro"}
      className="modal"
    >
      <div className="modal">
        <h2>{isCreating ? "Criar Novo Parceiro" : "Editar Parceiro"}</h2>
        {currentItem && (
          <form>
            <label>
              Nome: <span className="required">*</span>
              <input
                type="text"
                name="name"
                value={currentItem.name || ""}
                onChange={onChange}
                required
                placeholder="Digite o nome"
              />
            </label>
            <label>
              Descrição: <span className="required">*</span>
              <input
                type="text"
                name="description"
                value={currentItem.description || ""}
                onChange={onChange}
                required
                placeholder="Digite a descrição"
              />
            </label>
            <label>
              Rep. Git: <span className="required">*</span>
              <input
                type="text"
                name="repositoryGit"
                value={currentItem.repositoryGit || ""}
                onChange={onChange}
                required
                placeholder="Digite o repositório Git"
              />
            </label>
            <label>
              Documento: <span className="required">*</span>
              <input
                type="text"
                name="urlDoc"
                value={currentItem.urlDoc || ""}
                onChange={onChange}
                required
                placeholder="Digite o documento"
              />
            </label>
            <label>
              Clientes:
              <input
                type="text"
                name="clients"
                value={
                  currentItem.clients ? currentItem.clients.join(", ") : ""
                }
                onChange={onSelectChange}
                placeholder="Digite os clientes"
              />
            </label>
            <label>
              Projetos:
              <input
                type="text"
                name="projects"
                value={
                  currentItem.projects ? currentItem.projects.join(", ") : ""
                }
                onChange={onSelectChange}
                placeholder="Digite os projetos"
              />
            </label>
            <button type="button" onClick={handleSave}>
              {isCreating ? "Criar" : "Salvar"}
            </button>
            <button type="button" onClick={onCancel}>
              Cancelar
            </button>
          </form>
        )}
      </div>
    </Modal>
  );
}

// Define os PropTypes para o ModalPartner
ModalPartner.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  isCreating: PropTypes.bool.isRequired,
  currentItem: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    repositoryGit: PropTypes.string,
    urlDoc: PropTypes.string,
    clients: PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array])
    ),
    projects: PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array])
    ),
  }),
  onChange: PropTypes.func.isRequired,
  onSelectChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default ModalPartner;
