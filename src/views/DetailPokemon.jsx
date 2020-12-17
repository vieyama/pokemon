import { Button, Card, Col, Descriptions, Image, Row } from 'antd'
import React, { useState } from 'react'
import { usePalette } from 'react-palette'
import PokeballPlaceholder from 'assets/images/pokeball-placeholder.png'
import CompareImage from 'assets/images/fight.png'
import { filter, get, map } from 'lodash'
import { ModalCompare } from 'components'

const DetailPokemon = (props) => {
    const { location } = props
    const pokemonDetail = location.state.detailData
    const [visibleModal, setVisibleModal] = useState(false)
    console.log(pokemonDetail)

    const { abilities, forms, species, stats, types } = pokemonDetail

    const { data: colorPalette } = usePalette(
        `https://pokeres.bastionbot.org/images/pokemon/${pokemonDetail.id}.png`
    )

    const handleFinish = (values) => {
        console.log(values)
    }
    return (
        <Row className="card-pokemon-detail" key={pokemonDetail.id}>
            <Col span={24}>
                <Button
                    type="link"
                    className="btn-compare"
                    onClick={() => setVisibleModal(true)}
                >
                    <img src={CompareImage} alt="" />
                </Button>
                <Card
                    className="card-pokemon"
                    style={{ width: 300, background: colorPalette.vibrant }}
                    hoverable
                >
                    <Image
                        placeholder={
                            <Image preview={false} src={PokeballPlaceholder} />
                        }
                        src={`https://pokeres.bastionbot.org/images/pokemon/${pokemonDetail.id}.png`}
                        preview={false}
                        className="logo"
                        fallback={PokeballPlaceholder}
                    />
                </Card>

                <h2 className="poke-name">{pokemonDetail.name}</h2>
                <Row style={{ padding: '50px 100px' }} className="poke-detail">
                    <Col span={24} style={{ textAlign: 'left' }}>
                        <Descriptions title="Detail Data">
                            <Descriptions.Item label="Base Experience">
                                {pokemonDetail.base_experience}
                            </Descriptions.Item>
                            <Descriptions.Item label="Height">
                                {pokemonDetail.height}
                            </Descriptions.Item>
                            <Descriptions.Item label="Weight">
                                {pokemonDetail.weight}
                            </Descriptions.Item>
                            <Descriptions.Item label="Order">
                                {pokemonDetail.order}
                            </Descriptions.Item>
                            <Descriptions.Item label="Attack">
                                {get(
                                    filter(
                                        stats,
                                        (e) => e.stat.name === 'attack'
                                    ),
                                    '0.base_stat',
                                    0
                                )}
                            </Descriptions.Item>
                            <Descriptions.Item label="Defense">
                                {get(
                                    filter(
                                        stats,
                                        (e) => e.stat.name === 'defense'
                                    ),
                                    '0.base_stat',
                                    0
                                )}
                            </Descriptions.Item>
                            <Descriptions.Item label="HP">
                                {get(
                                    filter(stats, (e) => e.stat.name === 'hp'),
                                    '0.base_stat',
                                    0
                                )}
                            </Descriptions.Item>

                            <Descriptions.Item label="Species">
                                {species.name}
                            </Descriptions.Item>
                            <Descriptions.Item label="Special Attack">
                                {get(
                                    filter(
                                        stats,
                                        (e) => e.stat.name === 'special-attack'
                                    ),
                                    '0.base_stat',
                                    0
                                )}
                            </Descriptions.Item>
                            <Descriptions.Item label="Special Defense">
                                {get(
                                    filter(
                                        stats,
                                        (e) => e.stat.name === 'special-defense'
                                    ),
                                    '0.base_stat',
                                    0
                                )}
                            </Descriptions.Item>
                            <Descriptions.Item label="Speed">
                                {get(
                                    filter(
                                        stats,
                                        (e) => e.stat.name === 'speed'
                                    ),
                                    '0.base_stat',
                                    0
                                )}
                            </Descriptions.Item>
                            <Descriptions.Item label="Form">
                                <ul>
                                    {map(forms, (e) => (
                                        <li>{e.name}</li>
                                    ))}
                                </ul>
                            </Descriptions.Item>
                            <Descriptions.Item label="Type">
                                <ul>
                                    {map(types, (type) => (
                                        <li>{type.type.name}</li>
                                    ))}
                                </ul>
                            </Descriptions.Item>

                            <Descriptions.Item label="Abilities">
                                <ul>
                                    {map(abilities, (e) => (
                                        <li>{e.ability.name}</li>
                                    ))}
                                </ul>
                            </Descriptions.Item>
                        </Descriptions>
                    </Col>
                </Row>
            </Col>
            <ModalCompare
                visible={visibleModal}
                setVisibleModal={setVisibleModal}
                pokemonActive={pokemonDetail.name}
                handleFinish={handleFinish}
            />
        </Row>
    )
}

export default DetailPokemon
