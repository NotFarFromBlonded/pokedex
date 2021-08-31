import React,{useState, useEffect} from "react";
/*import mockData from './mockData'*/
import {Typography, CircularProgress, Button, Grid, Card, CardContent} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import axios from "axios";

const firstCharUpperCase = (name) => name.charAt(0).toUpperCase()+name.slice(1);
const useStyles = makeStyles({
    pokeContainer: {
        maxWidth: '1080px',
        margin: 'auto',
        textAlign: 'center'
    },
    pokedexButton: {
        maxWidth: '1080px',
        margin: 'auto',
        textAlign: 'center'
    },
    pokeInfoCard: {
        maxWidth: '360px',
        margin: 'auto'
    }
})
const Pokemon = (props) => {
    const {match, history} =props;
    const {params} = match;
    const {pokemonId} = params;
    const [pokemon, setPokemon] = useState(undefined);
    const classes = useStyles();

    useEffect(() => {
        axios
            .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
            .then(function (response) {
                const{data}=response;
                setPokemon(data);
            })
            .catch(function (error){
                setPokemon(false);
            }, [pokemonId]);
    })

    const generatePokemon = () => {
        const {name, id, species, height, weight, types} = pokemon;
        const fullImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
        /*const {front_default}=sprites;*/
        return (
            <>
                <Grid>
                    <div className = {classes.pokeContainer}>
                        <Typography variant = "h3">
                            {`#${id.toString().padStart(3, '0')}`} {firstCharUpperCase(name)}
                        </Typography>
                        <img style={{ width: "300px", height: "300px" }} src={fullImage} alt={name}/>
                        <Card className={classes.pokeInfoCard}>
                            <CardContent>
                                <Typography variant = "h3">{firstCharUpperCase(name)}</Typography>
                                <Typography>Height: {height} </Typography>
                                <Typography>Weight: {weight} </Typography>
                                <Typography variant="h6"> Types:</Typography>
                                {types.map((typeInfo) => {
                                    const { type } = typeInfo;
                                    const { name } = type;
                                    return <Typography key={name}> {`${name}`}</Typography>;})}
                            </CardContent>
                        </Card>
                        
                    </div>
                </Grid>
            </>
        )
    }

    return (
        <>
            {/*generatePokemon()*/}
            {pokemon === undefined && <CircularProgress />}
            {pokemon !== undefined && pokemon && generatePokemon()}
            {pokemon === false && <Typography> Pokemon not found </Typography>}
            {pokemon !== undefined && (
                <Grid className= {classes.pokedexButton}>
                    <Button variant="contained" onClick={() => history.push("/")}>
                        back to pokedex
                    </Button>
                </Grid>
            )}
        </>
    );
}

export default Pokemon;