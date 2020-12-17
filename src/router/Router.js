import Home from 'views/Home'
import DetailPokemon from 'views/DetailPokemon'
import ComparePokemon from 'views/ComparePokemon'
var routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/detail-pokemon',
        component: DetailPokemon,
    },
    {
        path: '/compare-pokemon',
        component: ComparePokemon,
    },
]
export default routes
