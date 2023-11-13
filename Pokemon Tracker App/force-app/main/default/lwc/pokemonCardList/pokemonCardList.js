import { LightningElement } from 'lwc';
import getPokemons from '@salesforce/apex/PokemonClass.getPokemons';

export default class PokemonCardList extends LightningElement {

    pokemons;
    error;
    searchWords='';
    isSearchNotAvailable = false;
    
    connectedCallback(){

        this.loadPokemons(this.searchWords);

    }

    handleSearch(event){
        
        this.searchWords = event.target.value;

        this.loadPokemons(this.searchWords);
        
    }

    loadPokemons(searchWords){

        getPokemons({ searchKey: searchWords})
        .then(result =>{
            this.pokemons = result;
            console.log(" this.pokemons:"+JSON.stringify(this.pokemons))
            if(this.pokemons.length > 0){
                this.isSearchNotAvailable = false;
            }else{
                this.isSearchNotAvailable = true;
            }

        })
        .catch(error =>{
            this.isSearchNotAvailable = false;
            this.error = error
        })

    }
     
}

