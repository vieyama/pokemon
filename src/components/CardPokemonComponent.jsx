import { Card, Image } from 'antd'
import Provider from 'providers/Provider'
import React, { useEffect, useState } from 'react'
import { usePalette } from 'react-palette'
import PokeballPlaceholder from 'assets/images/pokeball-placeholder.png'
import { useHistory } from 'react-router'
const CardPokemonComponent = (props) => {
    const history = useHistory()

    const { data } = props

    const [dataPokemon, setDataPokemon] = useState({})

    const [loading, setLoading] = useState(true)

    const getDetailPokemon = async () => {
        setLoading(true)
        await Provider.get(data.url).then((result) => {
            setDataPokemon(result)
            setLoading(false)
        })
    }

    useEffect(() => {
        getDetailPokemon()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const { data: colorPalette } = usePalette(
        `https://pokeres.bastionbot.org/images/pokemon/${dataPokemon.id}.png`
    )
    return (
        <div className="card-pokemon" key={dataPokemon.id}>
            <Card
                style={{ background: colorPalette.vibrant }}
                hoverable
                onClick={() =>
                    history.push({
                        pathname: '/detail-pokemon',
                        state: {
                            detailData: dataPokemon,
                        },
                    })
                }
            >
                {loading ? (
                    <Image
                        src={PokeballPlaceholder}
                        preview={false}
                        className="logo"
                        fallback={PokeballPlaceholder}
                    />
                ) : (
                    <>
                        <Image
                            placeholder={
                                <Image
                                    preview={false}
                                    src={PokeballPlaceholder}
                                />
                            }
                            src={`https://pokeres.bastionbot.org/images/pokemon/${dataPokemon.id}.png`}
                            preview={false}
                            className="logo"
                            fallback={PokeballPlaceholder}
                        />
                        <h4>{dataPokemon.name}</h4>
                    </>
                )}
            </Card>
        </div>
    )
}

export default CardPokemonComponent
