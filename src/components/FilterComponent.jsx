import { Badge, Button, Divider } from 'antd'
import React, { useEffect, useState } from 'react'
import Provider from 'providers/Provider'
import { map } from 'lodash'
import PokeballImage from 'assets/images/pokeball.png'

const API_BASE_URL = process.env.REACT_APP_BASE_URL

const colorPallete = [
    '#ffcb05',
    '#3d7dca',
    '#fef65b',
    '#15d9c0',
    '#e49b0f',
    '#e76f51',
    '#f4a261',
    '#e9c46a',
    '#2a9d8f',
    '#cb997e',
    '#f0efeb',
    '#fff1e6',
    '#fca311',
    '#dc2f02',
    '#e85d04',
    '#eae2b7',
    '#48bfe3',
    '#ffbe0b',
    '#ff006e',
]

const FilterComponent = (props) => {
    const { handleFilter } = props

    const [typePokemonData, setTypePokemonData] = useState([])
    const [activeFilter, setActiveFilter] = useState()

    const getAbility = async () => {
        await Provider.get(API_BASE_URL + '/type').then((result) => {
            const { results } = result
            setTypePokemonData(results)
        })
    }

    useEffect(() => {
        getAbility()
    }, [])

    return (
        <div className="filter-container">
            <div className="divider">
                <img src={PokeballImage} alt="" />
                <span>Filter by Pokemon type</span>
            </div>
            <br />
            <br />
            {map(typePokemonData, (item, key) => {
                return (
                    <Button
                        type="primary"
                        onClick={() => {
                            handleFilter(item)
                            setActiveFilter(key)
                        }}
                        key={key}
                        className={`button-type ${
                            activeFilter === key ? 'active' : ''
                        }`}
                        style={{ background: colorPallete[key] }}
                    >
                        {item.name}
                    </Button>
                )
            })}
        </div>
    )
}

export default FilterComponent
