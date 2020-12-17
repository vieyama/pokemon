import { Card, Col, Image, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import { Loading } from 'components'
import { usePalette } from 'react-palette'
import PokeballPlaceholder from 'assets/images/pokeball-placeholder.png'
import Versus from 'assets/images/versus.png'
import { filter, get } from 'lodash'
import Provider from 'providers/Provider'
const API_BASE_URL = process.env.REACT_APP_BASE_URL

const DetailPokemon = (props) => {
    const { location } = props
    const [loading, setLoading] = useState(true)
    const [pokemonChallenger, setPokemonChallenger] = useState([])

    const pokemonDetail = location.state.detailData
    const pokemonActive = location.state.pokemonActive

    const getPokemonActiveData = async () => {
        Provider.get(API_BASE_URL + '/pokemon/' + pokemonActive).then((res) => {
            setPokemonChallenger(res)
            setLoading(false)
        })
    }

    useEffect(() => {
        getPokemonActiveData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const { data: colorPalette } = usePalette(
        `https://pokeres.bastionbot.org/images/pokemon/${pokemonDetail.id}.png`
    )
    const { data: colorPaletteChallenger } = usePalette(
        `https://pokeres.bastionbot.org/images/pokemon/${pokemonChallenger.id}.png`
    )

    return loading ? (
        <Loading />
    ) : (
        <React.Fragment>
            <Row
                className="card-pokemon-detail"
                key={pokemonChallenger.id}
                justify="center"
            >
                <Col span={10}>
                    <Card
                        className="card-pokemon"
                        style={{
                            width: 300,
                            background: colorPaletteChallenger.vibrant,
                        }}
                        hoverable
                    >
                        <Image
                            placeholder={
                                <Image
                                    preview={false}
                                    src={PokeballPlaceholder}
                                />
                            }
                            src={`https://pokeres.bastionbot.org/images/pokemon/${pokemonChallenger.id}.png`}
                            preview={false}
                            className="logo"
                            fallback={PokeballPlaceholder}
                        />
                    </Card>

                    <h2 className="poke-name">{pokemonChallenger.name}</h2>
                </Col>
                <Col span={4}>
                    <img width="150px" src={Versus} alt="" />
                </Col>
                <Col span={10}>
                    <Card
                        className="card-pokemon"
                        style={{ width: 300, background: colorPalette.vibrant }}
                        hoverable
                    >
                        <Image
                            placeholder={
                                <Image
                                    preview={false}
                                    src={PokeballPlaceholder}
                                />
                            }
                            src={`https://pokeres.bastionbot.org/images/pokemon/${pokemonDetail.id}.png`}
                            preview={false}
                            className="logo"
                            fallback={PokeballPlaceholder}
                        />
                    </Card>

                    <h2 className="poke-name">{pokemonDetail.name}</h2>
                </Col>
                <Col span={20} className="table-wrapper">
                    <table className="table-compare" id="table-compare">
                        <thead>
                            <tr>
                                <th></th>
                                <th>{pokemonChallenger.name}</th>
                                <th>{pokemonDetail.name}</th>
                                <th>Winner</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Base Experience</td>
                                <td>{pokemonChallenger.base_experience}</td>
                                <td>{pokemonDetail.base_experience}</td>
                                <td
                                    id={
                                        pokemonChallenger.base_experience >=
                                        pokemonDetail.base_experience
                                            ? pokemonChallenger.name
                                            : pokemonDetail.name
                                    }
                                >
                                    {pokemonChallenger.base_experience >=
                                    pokemonDetail.base_experience
                                        ? pokemonChallenger.name
                                        : pokemonDetail.name}
                                </td>
                            </tr>
                            <tr>
                                <td>Height</td>
                                <td>{pokemonChallenger.height}</td>
                                <td>{pokemonDetail.height}</td>
                                <td
                                    id={
                                        pokemonChallenger.height >=
                                        pokemonDetail.height
                                            ? pokemonChallenger.name
                                            : pokemonDetail.name
                                    }
                                >
                                    {pokemonChallenger.height >=
                                    pokemonDetail.height
                                        ? pokemonChallenger.name
                                        : pokemonDetail.name}
                                </td>
                            </tr>
                            <tr>
                                <td>Weight</td>
                                <td>{pokemonChallenger.weight}</td>
                                <td>{pokemonDetail.weight}</td>
                                <td
                                    id={
                                        pokemonChallenger.weight >=
                                        pokemonDetail.weight
                                            ? pokemonChallenger.name
                                            : pokemonDetail.name
                                    }
                                >
                                    {pokemonChallenger.weight >=
                                    pokemonDetail.weight
                                        ? pokemonChallenger.name
                                        : pokemonDetail.name}
                                </td>
                            </tr>
                            <tr>
                                <td>Order</td>
                                <td>{pokemonChallenger.order}</td>
                                <td>{pokemonDetail.order}</td>
                                <td
                                    id={
                                        pokemonChallenger.order >=
                                        pokemonDetail.order
                                            ? pokemonChallenger.name
                                            : pokemonDetail.name
                                    }
                                >
                                    {pokemonChallenger.order >=
                                    pokemonDetail.order
                                        ? pokemonChallenger.name
                                        : pokemonDetail.name}
                                </td>
                            </tr>
                            <tr>
                                <td>Attack</td>
                                <td>
                                    {get(
                                        filter(
                                            pokemonChallenger.stats,
                                            (e) => e.stat.name === 'attack'
                                        ),
                                        '0.base_stat',
                                        0
                                    )}
                                </td>
                                <td>
                                    {get(
                                        filter(
                                            pokemonDetail.stats,
                                            (e) => e.stat.name === 'attack'
                                        ),
                                        '0.base_stat',
                                        0
                                    )}
                                </td>
                                <td
                                    id={
                                        get(
                                            filter(
                                                pokemonChallenger.stats,
                                                (e) => e.stat.name === 'attack'
                                            ),
                                            '0.base_stat',
                                            0
                                        ) >=
                                        get(
                                            filter(
                                                pokemonDetail.stats,
                                                (e) => e.stat.name === 'attack'
                                            ),
                                            '0.base_stat',
                                            0
                                        )
                                            ? pokemonChallenger.name
                                            : pokemonDetail.name
                                    }
                                >
                                    {get(
                                        filter(
                                            pokemonChallenger.stats,
                                            (e) => e.stat.name === 'attack'
                                        ),
                                        '0.base_stat',
                                        0
                                    ) >=
                                    get(
                                        filter(
                                            pokemonDetail.stats,
                                            (e) => e.stat.name === 'attack'
                                        ),
                                        '0.base_stat',
                                        0
                                    )
                                        ? pokemonChallenger.name
                                        : pokemonDetail.name}
                                </td>
                            </tr>
                            <tr>
                                <td>Defense</td>
                                <td>
                                    {get(
                                        filter(
                                            pokemonChallenger.stats,
                                            (e) => e.stat.name === 'defense'
                                        ),
                                        '0.base_stat',
                                        0
                                    )}
                                </td>
                                <td>
                                    {get(
                                        filter(
                                            pokemonDetail.stats,
                                            (e) => e.stat.name === 'defense'
                                        ),
                                        '0.base_stat',
                                        0
                                    )}
                                </td>
                                <td
                                    id={
                                        get(
                                            filter(
                                                pokemonChallenger.stats,
                                                (e) => e.stat.name === 'defense'
                                            ),
                                            '0.base_stat',
                                            0
                                        ) >=
                                        get(
                                            filter(
                                                pokemonDetail.stats,
                                                (e) => e.stat.name === 'defense'
                                            ),
                                            '0.base_stat',
                                            0
                                        )
                                            ? pokemonChallenger.name
                                            : pokemonDetail.name
                                    }
                                >
                                    {get(
                                        filter(
                                            pokemonChallenger.stats,
                                            (e) => e.stat.name === 'defense'
                                        ),
                                        '0.base_stat',
                                        0
                                    ) >=
                                    get(
                                        filter(
                                            pokemonDetail.stats,
                                            (e) => e.stat.name === 'defense'
                                        ),
                                        '0.base_stat',
                                        0
                                    )
                                        ? pokemonChallenger.name
                                        : pokemonDetail.name}
                                </td>
                            </tr>
                            <tr>
                                <td>HP</td>
                                <td>
                                    {get(
                                        filter(
                                            pokemonChallenger.stats,
                                            (e) => e.stat.name === 'hp'
                                        ),
                                        '0.base_stat',
                                        0
                                    )}
                                </td>
                                <td>
                                    {get(
                                        filter(
                                            pokemonDetail.stats,
                                            (e) => e.stat.name === 'hp'
                                        ),
                                        '0.base_stat',
                                        0
                                    )}
                                </td>
                                <td
                                    id={
                                        get(
                                            filter(
                                                pokemonChallenger.stats,
                                                (e) => e.stat.name === 'hp'
                                            ),
                                            '0.base_stat',
                                            0
                                        ) >=
                                        get(
                                            filter(
                                                pokemonDetail.stats,
                                                (e) => e.stat.name === 'hp'
                                            ),
                                            '0.base_stat',
                                            0
                                        )
                                            ? pokemonChallenger.name
                                            : pokemonDetail.name
                                    }
                                >
                                    {get(
                                        filter(
                                            pokemonChallenger.stats,
                                            (e) => e.stat.name === 'hp'
                                        ),
                                        '0.base_stat',
                                        0
                                    ) >=
                                    get(
                                        filter(
                                            pokemonDetail.stats,
                                            (e) => e.stat.name === 'hp'
                                        ),
                                        '0.base_stat',
                                        0
                                    )
                                        ? pokemonChallenger.name
                                        : pokemonDetail.name}
                                </td>
                            </tr>
                            <tr>
                                <td>Special Attack</td>
                                <td>
                                    {get(
                                        filter(
                                            pokemonChallenger.stats,
                                            (e) =>
                                                e.stat.name === 'special-attack'
                                        ),
                                        '0.base_stat',
                                        0
                                    )}
                                </td>
                                <td>
                                    {get(
                                        filter(
                                            pokemonDetail.stats,
                                            (e) =>
                                                e.stat.name === 'special-attack'
                                        ),
                                        '0.base_stat',
                                        0
                                    )}
                                </td>
                                <td
                                    id={
                                        get(
                                            filter(
                                                pokemonChallenger.stats,
                                                (e) =>
                                                    e.stat.name ===
                                                    'special-attack'
                                            ),
                                            '0.base_stat',
                                            0
                                        ) >=
                                        get(
                                            filter(
                                                pokemonDetail.stats,
                                                (e) =>
                                                    e.stat.name ===
                                                    'special-attack'
                                            ),
                                            '0.base_stat',
                                            0
                                        )
                                            ? pokemonChallenger.name
                                            : pokemonDetail.name
                                    }
                                >
                                    {get(
                                        filter(
                                            pokemonChallenger.stats,
                                            (e) =>
                                                e.stat.name === 'special-attack'
                                        ),
                                        '0.base_stat',
                                        0
                                    ) >=
                                    get(
                                        filter(
                                            pokemonDetail.stats,
                                            (e) =>
                                                e.stat.name === 'special-attack'
                                        ),
                                        '0.base_stat',
                                        0
                                    )
                                        ? pokemonChallenger.name
                                        : pokemonDetail.name}
                                </td>
                            </tr>
                            <tr>
                                <td>Special Defense</td>
                                <td>
                                    {get(
                                        filter(
                                            pokemonChallenger.stats,
                                            (e) =>
                                                e.stat.name ===
                                                'special-defense'
                                        ),
                                        '0.base_stat',
                                        0
                                    )}
                                </td>
                                <td>
                                    {get(
                                        filter(
                                            pokemonDetail.stats,
                                            (e) =>
                                                e.stat.name ===
                                                'special-defense'
                                        ),
                                        '0.base_stat',
                                        0
                                    )}
                                </td>
                                <td
                                    id={
                                        get(
                                            filter(
                                                pokemonChallenger.stats,
                                                (e) =>
                                                    e.stat.name ===
                                                    'special-defense'
                                            ),
                                            '0.base_stat',
                                            0
                                        ) >=
                                        get(
                                            filter(
                                                pokemonDetail.stats,
                                                (e) =>
                                                    e.stat.name ===
                                                    'special-defense'
                                            ),
                                            '0.base_stat',
                                            0
                                        )
                                            ? pokemonChallenger.name
                                            : pokemonDetail.name
                                    }
                                >
                                    {get(
                                        filter(
                                            pokemonChallenger.stats,
                                            (e) =>
                                                e.stat.name ===
                                                'special-defense'
                                        ),
                                        '0.base_stat',
                                        0
                                    ) >=
                                    get(
                                        filter(
                                            pokemonDetail.stats,
                                            (e) =>
                                                e.stat.name ===
                                                'special-defense'
                                        ),
                                        '0.base_stat',
                                        0
                                    )
                                        ? pokemonChallenger.name
                                        : pokemonDetail.name}
                                </td>
                            </tr>
                            <tr>
                                <td>Speed</td>
                                <td>
                                    {get(
                                        filter(
                                            pokemonChallenger.stats,
                                            (e) => e.stat.name === 'speed'
                                        ),
                                        '0.base_stat',
                                        0
                                    )}
                                </td>
                                <td>
                                    {get(
                                        filter(
                                            pokemonDetail.stats,
                                            (e) => e.stat.name === 'speed'
                                        ),
                                        '0.base_stat',
                                        0
                                    )}
                                </td>
                                <td
                                    id={
                                        get(
                                            filter(
                                                pokemonChallenger.stats,
                                                (e) => e.stat.name === 'speed'
                                            ),
                                            '0.base_stat',
                                            0
                                        ) >=
                                        get(
                                            filter(
                                                pokemonDetail.stats,
                                                (e) => e.stat.name === 'speed'
                                            ),
                                            '0.base_stat',
                                            0
                                        )
                                            ? pokemonChallenger.name
                                            : pokemonDetail.name
                                    }
                                >
                                    {get(
                                        filter(
                                            pokemonChallenger.stats,
                                            (e) => e.stat.name === 'speed'
                                        ),
                                        '0.base_stat',
                                        0
                                    ) >=
                                    get(
                                        filter(
                                            pokemonDetail.stats,
                                            (e) => e.stat.name === 'speed'
                                        ),
                                        '0.base_stat',
                                        0
                                    )
                                        ? pokemonChallenger.name
                                        : pokemonDetail.name}
                                </td>
                            </tr>
                            <tr>
                                <th colSpan="3">Prediction of The Winner</th>
                                <th>
                                    {document.querySelectorAll(
                                        `#${pokemonChallenger.name}`
                                    ).length >=
                                    document.querySelectorAll(
                                        `#${pokemonDetail.name}`
                                    ).length
                                        ? pokemonChallenger.name
                                        : pokemonDetail.name}
                                </th>
                            </tr>
                        </tbody>
                    </table>
                </Col>
            </Row>
        </React.Fragment>
    )
}

export default DetailPokemon
