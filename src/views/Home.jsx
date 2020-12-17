import { Button, Col, List, Row } from 'antd'
import { FilterComponent, CardPokemonComponent, Loading } from 'components'
import { isEmpty, isUndefined, map } from 'lodash'
import Provider from 'providers/Provider'
import React, { useEffect, useState } from 'react'
import PrevImage from 'assets/images/pikachu-prev.png'
import NextImage from 'assets/images/pikachu-next.png'

const API_BASE_URL = process.env.REACT_APP_BASE_URL

const Home = () => {
    const [url, setUrl] = useState(API_BASE_URL + `/pokemon?limit=20&offset=0`)
    const [pokemonData, setPokemonData] = useState([])
    const [loading, setLoading] = useState(false)
    const [pagination, setPagination] = useState({
        withPagination: true,
        prev: null,
        next: null,
    })

    const handleFilter = (values) => {
        setUrl(values.url)
    }

    const getPokemonData = async () => {
        setLoading(true)
        await Provider.get(url)
            .then((result) => {
                const { results, next, previous } = result
                if (!isUndefined(results)) {
                    setPokemonData(results)
                    setPagination({
                        withPagination:
                            isUndefined(next) || isUndefined(previous)
                                ? false
                                : true,
                        prev: previous,
                        next: next,
                    })
                } else {
                    const { pokemon } = result
                    setPokemonData(map(pokemon, (item) => item.pokemon))
                    setPagination({
                        withPagination:
                            isUndefined(next) || isUndefined(previous)
                                ? false
                                : true,
                        prev: previous,
                        next: next,
                    })
                }

                setLoading(false)
            })
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        getPokemonData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url])

    return (
        <div className="home">
            <Row>
                <Col span={24}>
                    <FilterComponent handleFilter={handleFilter} />
                </Col>
            </Row>
            {loading ? (
                <Loading />
            ) : (
                <>
                    <List
                        className="card-container"
                        grid={{
                            gutter: 16,
                            xs: 1,
                            sm: 3,
                            md: 4,
                            lg: 5,
                            xl: 6,
                            xxl: 3,
                        }}
                        dataSource={pokemonData}
                        renderItem={(pokemon) => (
                            <List.Item>
                                <CardPokemonComponent data={pokemon} />
                            </List.Item>
                        )}
                    />
                    {pagination.withPagination && (
                        <Row className="pagination">
                            <Col span={12} style={{ textAlign: 'center' }}>
                                <Button
                                    type="link"
                                    onClick={() => setUrl(pagination.prev)}
                                    disabled={isEmpty(pagination.prev)}
                                >
                                    <img
                                        src={PrevImage}
                                        className="pagination-image"
                                        alt=""
                                    />
                                </Button>
                            </Col>
                            <Col span={12} style={{ textAlign: 'center' }}>
                                <Button
                                    type="link"
                                    onClick={() => setUrl(pagination.next)}
                                    disabled={isEmpty(pagination.next)}
                                >
                                    <img
                                        src={NextImage}
                                        className="pagination-image"
                                        alt=""
                                    />
                                </Button>
                            </Col>
                        </Row>
                    )}
                </>
            )}
        </div>
    )
}

export default Home
