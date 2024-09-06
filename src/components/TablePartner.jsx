import PropTypes from "prop-types";
import Pagination from "./Pagination";

function TablePartner({
  items,
  onEdit,
  onDelete,
  totalPages,
  currentPage,
  onPageChange,
}) {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Rep. Git</th>
            <th>Doc.</th>
            <th>Clientes</th>
            <th>Projetos</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>{item.repositoryGit}</td>
              <td>
                <a href={item.urlDoc} target="_blank" rel="noopener noreferrer">
                  Documento
                </a>
              </td>
              <td>
                {Array.isArray(item.clients) && item.clients.length > 0 ? (
                  <select>
                    {item.clients.map((client, index) => (
                      <option key={index} value={client}>
                        {client}
                      </option>
                    ))}
                  </select>
                ) : (
                  "Sem clientes"
                )}
              </td>
              <td>
                {Array.isArray(item.projects) && item.projects.length > 0 ? (
                  <select>
                    {item.projects.map((project, index) => (
                      <option key={index} value={project}>
                        {project}
                      </option>
                    ))}
                  </select>
                ) : (
                  "Sem projetos"
                )}
              </td>
              <td>
                <div className="actions"></div>
                <button className="edit" onClick={() => onEdit(item)}>
                  Editar
                </button>
                <button className="delete" onClick={() => onDelete(item.id)}>
                  Deletar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    </div>
  );
}

TablePartner.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      repositoryGit: PropTypes.string.isRequired,
      urlDoc: PropTypes.string.isRequired,
      clients: PropTypes.arrayOf(
        PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
          PropTypes.array,
        ])
      ).isRequired,
      projects: PropTypes.arrayOf(
        PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
          PropTypes.array,
        ])
      ).isRequired,
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default TablePartner;
