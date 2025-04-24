import { useState } from 'react';
import Header from '../../components/Header/Header';
import './index.scss';
import SubmenuLivros from '../../components/SubmenuLivros/SubmenuLivros';
import { LivrosService } from '../../api/LivrosService';

const LivrosCadastro = () => {
  const [livro, setLivro] = useState({});

  async function createLivro() {
    const body = {
      id: Number(livro.id),
      titulo: livro.titulo,
      num_paginas: Number(livro.num_paginas),
      isbn: livro.isbn,
      editora: livro.editora
    };

    if (
      livro.id !== undefined && livro.id !== '' &&
      livro.titulo !== undefined && livro.titulo !== '' &&
      livro.num_paginas !== undefined && livro.num_paginas !== '' &&
      livro.isbn !== undefined && livro.isbn !== '' &&
      livro.editora !== undefined && livro.editora !== ''
    ) {
      await LivrosService.createLivro(body)
        .then((response) => {
          alert(response.data.mensagem); // corrigido
          document.getElementById('formulario').reset(); // corrigido
          setLivro({}); // limpa o state também, opcional
        })
        .catch(({ response: { data, status } }) => {
          alert(`${status} - ${data.mensagem || data}`); // melhor apresentação do erro
        });
    } else {
      alert('Preencha todos os campos!');
    }
  }

  return (
    <>
      <Header />
      <SubmenuLivros />
      <div className='livrosCadastro'>
        <h1>Cadastro de Livros</h1>
        <div>
          <form id="formulario">
            <div className='form-group'>
              <label>Id</label>
              <input type="text" id='id' required onChange={(e) => setLivro({ ...livro, id: e.target.value })} />
            </div>
            <div className='form-group'>
              <label>Título</label>
              <input type="text" id='titulo' required onChange={(e) => setLivro({ ...livro, titulo: e.target.value })} />
            </div>
            <div className='form-group'>
              <label>Número de Páginas</label>
              <input type="text" id='num' required onChange={(e) => setLivro({ ...livro, num_paginas: e.target.value })} />
            </div>
            <div className='form-group'>
              <label>ISBN</label>
              <input type="text" id='isbn' required onChange={(e) => setLivro({ ...livro, isbn: e.target.value })} />
            </div>
            <div className='form-group'>
              <label>Editora</label>
              <input type="text" id='editora' required onChange={(e) => setLivro({ ...livro, editora: e.target.value })} />
            </div>
            <div className='form-group'>
              <button onClick={(e) => {
                e.preventDefault(); // impede reload do form
                createLivro();
              }}>Cadastrar Livro</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LivrosCadastro;
