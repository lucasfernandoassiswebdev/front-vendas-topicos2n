import React from "react";
import { Formulario, Repo, Title } from "./styles";

import logo from '../../assets/logo.svg';
import { api } from "../../services/api";
import { Link } from 'react-router-dom';

export const Dashboard: React.FC = () => {

    interface IGithubRepository {
        full_name: string;
        description: string;
        owner: {
            login: string;
            avatar_url: string;
        }
    }

    const [novoRepositorio, setNovoRepositorio] = React.useState('')

    const [repositorios, setRepositorios] = React.useState<IGithubRepository[]>([])

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>): void {
        setNovoRepositorio(event.target.value)
    }

    async function handleAddRepo(event: React.FormEvent<HTMLFormElement>): Promise<void> {
        // não atualiza a página
        event.preventDefault()

        try {
            const response = await api.get<IGithubRepository>(`repos/${novoRepositorio}`)
            setRepositorios([...repositorios, response.data])
        } catch (err) {
            console.log('Repositório não encontrado')
        }
    }

    return (
        <>
            <img src={logo} alt="Git Collection"></img>
            <Title>Catálogo de repositórios do Github</Title>
            <Formulario onSubmit={handleAddRepo}>
                <input placeholder="username/nome_repositorio" onChange={handleInputChange} />
                <button type="submit">Buscar</button>
            </Formulario>
            <Repo>
                {
                    repositorios.map(repositorio => (
                        <Link to={`/repositories/${repositorio.full_name}`}>
                            <img src={repositorio.owner.avatar_url} alt={repositorio.owner.login}></img>
                            <div><strong>{repositorio.full_name}</strong><p>{repositorio.description}</p></div>
                        </Link>
                    ))
                }
            </Repo>
        </>
    )
}