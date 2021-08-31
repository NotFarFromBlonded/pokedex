import React, {useState,useEffect} from "react";
import {AppBar,Toolbar, Grid, Card, CardContent, CardMedia, CircularProgress, Typography,TextField, FormControl, InputLabel, OutlinedInput, InputAdornment} from '@material-ui/core';
import { fade,makeStyles} from '@material-ui/core/styles';
/*import mockData from './mockData';*/
import axios from "axios";
import SpritePikachu from "./SpritePikachu.svg";
import PokedexLogo from "./PokedexLogo.png";
import clsx from 'clsx';
const useStyles = makeStyles(theme => ({
    pokedexContainer: {
        margin: 'auto',
        maxWidth:'1080px',
        paddingTop: '20px',
        paddingLeft: '50px',
        paddingRight: '50px',
    },
    pokedexTitle: {
        margin: 'auto',
        padding: '10px 50px',
        textAlign: 'center',
        fontSize: 'xx-large',
        color:'#000000',
        marginTop: '25px',
        marginBottom: '10px'
    },
    appbar: {
        background: 'transparent', 
        boxShadow: 'none'
    },
    cardMedia: {
        margin: 'auto',
    },
    cardContent: {
        textAlign: 'Center',
    },
    card: {
        borderRadius: '20px'
    },
    pikachuIcon: {

    },
    searchInput: {
    },
    searchContainer: {
        display: 'flex',
        margin: 'auto',
        backgroundColor: fade(theme.palette.common.white, 0.50),
        borderRadius: "10px",
        marginTop: "5px",
        marginBottom: "25px"
    },
    margin: {
        margin: theme.spacing(1),
    },
    textField: {
        width: '35ch',
    },
    id: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: '10px',
        color: '#ffffff',
        padding: '1px 5px'
    }
}));

const firstCharUpperCase = (name) => name.charAt(0).toUpperCase()+name.slice(1);

const Pokedex = (props) => {
    const {history} = props;
    const classes = useStyles();
    const [pokemonData, setPokemonData] = useState({});
    const [filter, setFilter] = useState("");
    const handleSearchChange = (e) => {
        setFilter(e.target.value);
    };
    useEffect(() => {
        axios
            .get(`https://pokeapi.co/api/v2/pokemon?limit=493`)
            .then(function(response) {
                const {data} = response;
                const {results} = data;
                const newPokemonData = {};              
                results.forEach((pokemon, index)=>{
                    newPokemonData[index+1] = {
                        id: index+1,
                        name: pokemon.name,
                        sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index+1}.png`,
                    }
                });
                setPokemonData(newPokemonData);
            })
    }, [])
    const getPokemonCard = (pokemonId) => {
        /*console.log(pokemonData[`${pokemonId}`]);*/
        /*const {id,name}=pokemonData[`${pokemonId}`]
        const sprite = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;*/

        const {id,name,sprite,types}=pokemonData[pokemonId]
        return (
            <Grid item xs={12} sm={3} key={pokemonId}>
                <Card onClick = {() => history.push(`/${pokemonId}`)} className = {classes.card}>
                    <CardMedia
                        className = {classes.cardMedia}
                        image = {sprite}
                        style = {{width: "200px", height: "200px", display: "flex", justifyContent: "center",alignItems: "center", marginTop: "30px", marginBottom: "30px"}}
                    />
                    <CardContent className = {classes.cardContent}>
                        <Typography>
                            <span className={classes.id}>
                                {`${id.toString().padStart(3, '0')}`}
                            </span>
                        </Typography>
                        <Typography>
                            {`${firstCharUpperCase(name)}`}
                        </Typography>
                        
                    </CardContent>

                </Card>
            </Grid>
        );
    }
    return (
        <>
            <AppBar position="static" className={classes.appbar}>
                <div className = {classes.pokedexTitle}>
                    <img src = {PokedexLogo}></img>
                </div>
                <Toolbar>
                    <div className = {classes.searchContainer}>
                        <FormControl className={clsx( classes.textField)} variant="outlined">
                            <InputLabel>Pokemon</InputLabel>
                                <OutlinedInput
                                    onChange={handleSearchChange}
                                    endAdornment={
                                    <InputAdornment position="end">
                                        <img src={SpritePikachu} style={{width: "50px"}}></img>
                                    </InputAdornment>
                                    }
                                    labelWidth={70}
                                />
                        </FormControl>
                       
                    </div>
                </Toolbar>
            </AppBar>
            {pokemonData ? (<Grid container spacing={2} className = {classes.pokedexContainer}>
                {/*{getPokemanCard()}
                {getPokemanCard()}
                {getPokemanCard()}
                {getPokemanCard()}
                {getPokemanCard()}
                {getPokemanCard()}*/}
                {Object.keys(pokemonData).map((pokemonId) =>
                    pokemonData[pokemonId].name.includes(filter) &&
                    getPokemonCard(pokemonId)
                )}
            </Grid>)
            :
            (<CircularProgress/>)}
            
        </>
    );
    
};

export default Pokedex;