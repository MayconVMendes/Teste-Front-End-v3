function About() {
  return (
    <div className="about-project">
      <section className="description">
        <h2>Descrição do Projeto</h2>
        <p>
          Este projeto foi desenvolvido com o objetivo de realizar um teste de
          desenvolvedor front-end, o projeto foi desenvolvido para criar um
          sistema de gestão para empresas e parceiros que permite operações como
          criação, edição, visualização e exclusão de registros.
        </p>
      </section>
      <section className="technologies">
        <h2>Tecnologias Usadas</h2>
        <ul>
          <li>
            <strong>Frontend:</strong>
          </li>
          <ul>
            <li>
              <strong>React</strong>: Principal biblioteca usada na construção
              da interface do usuário.
            </li>
            <li>
              <strong>Vite</strong>: Empregado como um bundler e ferramenta de
              desenvolvimento para otimizar a construção e o tempo de
              recarregamento da aplicação.
            </li>
            <li>
              <strong>SCSS</strong>: Usado para estilização avançada, permitindo
              uma organização mais eficiente e flexível dos estilos.
            </li>
            <li>
              <strong>React Router DOM</strong>: Facilita a navegação entre
              diferentes páginas da aplicação, onde permite uma experiência de
              navegação fluida.
            </li>
            <li>
              <strong>Axios</strong>: Utilizado para realizar requisições HTTP
              para a API, facilitando a comunicação com o backend.
            </li>
            <li>
              <strong>Toastr</strong>: Implementado para exibir notificações
              amigáveis ao usuário sobre ações realizadas na aplicação.
            </li>
            <li>
              <strong>PropTypes</strong>: Utilizado para garantir a integridade
              dos dados passados para os componentes React, proporcionando uma
              melhor documentação e facilitando a identificação de erros durante
              o desenvolvimento.
            </li>
            <li>
              <strong>ESLint</strong>: Utilizado para identificar e corrigir
              problemas no código, garantindo que o código siga um estilo
              consistente e reduzindo a probabilidade de bugs.
            </li>
          </ul>
        </ul>
      </section>
      <section className="features">
        <h2>Funcionalidades Principais</h2>
        <ul>
          <li>
            <strong>Gestão de Empresas</strong>: Permite a criação, edição,
            visualização e exclusão de registros de empresas.
          </li>
          <li>
            <strong>Gestão de Parceiros</strong>: Permite a criação, edição,
            visualização e exclusão de registros de Parceiros.
          </li>
          <li>
            <strong>Paginação</strong>: Implementada para facilitar a navegação
            por grandes conjuntos de dados, melhorando a performance e a
            usabilidade.
          </li>
          <li>
            <strong>Modais</strong>: Utilizados para exibir formulários de
            criação e edição de maneira intuitiva e não intrusiva.
          </li>
          <li>
            <strong>Barra de Pesquisa</strong>: Ajuda a buscar por empresas ou
            parceiros específicos através do ID.
          </li>
        </ul>
      </section>
      <section className="sentiment">
        <h2>Sentimento</h2>
        <p>
          O desenvolvimento deste projeto foi uma experiência incrivel para mim,
          realizei desenvolvimento com tecnoligias que eu gosto. Tive a
          oportunidade para aprender algumas coisas que nunca usei antes, como
          paginação e o toast. O processo de criação e estrutura do projeto,
          ficaram do meu agrado, especialmente ao ver a aplicação ganhar forma e
          atender às necessidades que foram solicitadas na documentação. Tive
          algumas duvidas referente a forma de login, não ficou tão claro,
          entrei em contato com o responsavel, não obtive uma resposta por um
          determinado tempo, para não ficar &quot;parado&quot;, tomei a decisão
          de realizar um cadastro no localstorage, onde salva em um useContext
          para utilizar de forma global, fiz de uma maneira clara, onde se
          precisar realizar uma manutenção ou direcionar o cadastro para uma
          API, vai ser bem simples a criação do mesmo.
        </p>
      </section>
    </div>
  );
}

export default About;
