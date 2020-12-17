import { List, Modal, Row } from 'antd'
import { CardPokemonComponentModal } from 'components'
import { isUndefined, map, reject } from 'lodash'
import Provider from 'providers/Provider'
import React, { useEffect, useState } from 'react'

const API_BASE_URL = process.env.REACT_APP_BASE_URL

const ModalCompare = (props) => {
    const { visible, setVisibleModal, pokemonActive } = props
    const url = API_BASE_URL + `/pokemon?limit=20&offset=0`
    const [pokemonData, setPokemonData] = useState([])
    const getPokemonData = async () => {
        await Provider.get(url)
            .then((result) => {
                const { results } = result
                if (!isUndefined(results)) {
                    setPokemonData(results)
                } else {
                    const { pokemon } = result
                    setPokemonData(map(pokemon, (item) => item.pokemon))
                }
            })
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        getPokemonData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url])
    return (
        <Modal
            title="Modal 1000px width"
            centered
            visible={visible}
            width={1000}
            footer={null}
            onCancel={() => setVisibleModal(false)}
        >
            <Row>
                <List
                    className="card-container"
                    grid={{
                        gutter: 16,
                        xs: 1,
                        sm: 2,
                        md: 2,
                        lg: 3,
                        xl: 4,
                        xxl: 4,
                    }}
                    dataSource={reject(pokemonData, {
                        name: pokemonActive,
                    })}
                    renderItem={(pokemon) => (
                        <List.Item>
                            <CardPokemonComponentModal
                                data={pokemon}
                                pokemonActive={pokemonActive}
                            />
                        </List.Item>
                    )}
                />
            </Row>
        </Modal>
    )
}

export default ModalCompare
