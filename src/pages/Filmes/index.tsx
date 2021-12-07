import React from "react";
import { Formulario, Filme, Title } from "./styles";

import logo from '../../assets/logo.svg';
import { apiImdb } from "../../services/api";
import { Link } from 'react-router-dom';

export const Filmes: React.FC = () => {

    interface IFilme {
        Title: string;
        Year: string;
        Genre: string;
        Poster: string;
    }

    const [novoFilme, setNovoFilme] = React.useState('')

    const [filmes, setFilmes] = React.useState<IFilme[]>([])

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>): void {
        setNovoFilme(event.target.value)
    }

    async function handleAddFilme(event: React.FormEvent<HTMLFormElement>): Promise<void> {
        // não atualiza a página
        event.preventDefault()

        const myAPIKey = 'b5c16b59';

        try {
            const response = await apiImdb.get<IFilme>(`${novoFilme}&apikey=${myAPIKey}`)
            setFilmes([...filmes, response.data])
        } catch (err) {
            console.log('Filme não encontrado')
        }
    }

    return (
        <>
            <img src={logo} alt="Filme"></img>
            <Title>Catálogo de filmes do IMDB</Title>
            <Formulario onSubmit={handleAddFilme}>
                <input placeholder="username/nome_repositorio" onChange={handleInputChange} />
                <button type="submit">Buscar</button>
            </Formulario>
            <Filme>
                {
                    filmes.map(filme => (
                        <Link to={`/filmes/${filme.Title}`}>
                            <img src={filme.Poster} alt={filme.Title}></img>
                            <div><strong>{filme.Title}</strong><p>{filme.Year} - {filme.Genre}</p></div>
                        </Link>
                    ))
                }
            </Filme>
        </>
    )
}